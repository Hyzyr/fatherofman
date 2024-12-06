import React from 'react';
import html2canvas from 'html2canvas';

const useExportImg = ({ wrapper }) => {
  const exportCanvasAsImage = async () => {
    if (!wrapper.current) return;

    const wrapperEl = wrapper.current;
    const rndElement = wrapperEl.querySelector('.react-draggable');

    if (rndElement) {
      // Instead of modifying the DOM directly, create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = wrapperEl.style.cssText;
      tempContainer.className = wrapperEl.className;

      // Clone the content for export
      const cloneContent = wrapperEl.cloneNode(true);
      const cloneTextarea = cloneContent.querySelector('textarea');
      const img = cloneContent.querySelector('img');
      img.style.objectFit = 'cover';
      console.log(img);

      if (cloneTextarea) {
        // Replace textarea with div in the clone only
        const divElement = document.createElement('div');
        divElement.style.cssText = cloneTextarea.style.cssText;
        divElement.style.display = 'flex';
        divElement.style.alignItems = 'center';
        divElement.style.justifyContent = 'center';
        divElement.style.border = '0';
        divElement.innerHTML = cloneTextarea.value.replace(/\n/g, '<br>');
        cloneTextarea.parentNode?.replaceChild(divElement, cloneTextarea);
      }

      // Add clone to temp container
      tempContainer.appendChild(cloneContent);
      document.body.appendChild(tempContainer);

      try {
        const canvas = await html2canvas(tempContainer, {
          useCORS: true,
          scale: 2,
          backgroundColor: null,
        });

        const aspectRatio =
          parseFloat(wrapperEl.clientWidth) /
          parseFloat(wrapperEl.clientHeight);
        const newCanvas = document.createElement('canvas');
        const ctx = newCanvas.getContext('2d');

        if (aspectRatio > 1) {
          newCanvas.width = canvas.width;
          newCanvas.height = canvas.width / aspectRatio;
        } else {
          newCanvas.height = canvas.height;
          newCanvas.width = canvas.height * aspectRatio;
        }

        const sx = (canvas.width - newCanvas.width) / 2;
        const sy = (canvas.height - newCanvas.height) / 2;
        ctx?.drawImage(
          canvas,
          sx,
          sy,
          newCanvas.width,
          newCanvas.height,
          0,
          0,
          newCanvas.width,
          newCanvas.height
        );

        const link = document.createElement('a');
        link.download = 'journal.png';
        link.href = newCanvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.log('Export failed:', error);
      } finally {
        document.body.removeChild(tempContainer);
      }
    }
  };
  return { exportCanvasAsImage };
};

export default useExportImg;
