import JSZip from 'jszip';
const cacheName = 'fatherofman-main';
export const fetchArchiveImages = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((archive) => JSZip.loadAsync(archive))
      .then(function (zip) {
        resolve(zip);
      })
      .catch((err) => reject(err.message));
  });
};

export const loadArchiveImages = async (zip) => {
  const images = [];
  const images64 = [];
  window.zip = zip;
  zip.forEach((_, file) => {
    if (
      file.name.endsWith('.jpg') ||
      file.name.endsWith('.png') ||
      file.name.endsWith('.webp')
    )
      images.push(file.name);
  });
  images.sort();

  for (let index = 0; index < images.length; index++) {
    const image = images[index];

    const data64 = await zip.file(image).async('base64');
    const img = await promiseLoadImage('data:image/jpeg;base64,' + data64);
    images64[index] = img;
  }
  return images64;
};

export const promiseLoadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
  });
};
export const promiseLoadImageArr = async (srcList) => {
  let images = [];
  for (let index = 0; index < srcList.length; index++) {
    const imgSRC = srcList[index];
    let img = await promiseLoadImage(imgSRC);
    images.push(img);
  }
  return images;
};
export const preloadFiles = async (fileUrls, callback) => {
  let totalFiles = fileUrls.length;
  let percentage = 0;
  let percentagePerFile = 100 / totalFiles;

  const groupedArray = groupArray(fileUrls, 2);

  for (let index = 0; index < groupedArray.length; index++) {
    const group = groupedArray[index];
    const promises = group.map((url) =>
      fetch(url)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error('Failed to load file');
          }
        })
        .then((blob) => {
          percentage += Math.ceil(percentagePerFile);
          caches.open(cacheName).then((cache) => {
            cache.put(url, new Response(blob));
          });
          callback(percentage > 100 ? 100 : percentage);
        })
        .catch((error) => {
          console.log('Error loading file: %s\n', url, error);
        })
    );
    await Promise.all(promises);
    await promiseDelay(50);
  }
};

const promiseDelay = (delay) => {
  return new Promise((resolve) => setTimeout(() => resolve(), delay));
};
function groupArray(arr, chunkSize) {
  return arr.reduce((chunks, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }
    chunks[chunkIndex].push(item);
    return chunks;
  }, []);
}
