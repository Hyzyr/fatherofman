@echo off
for %%f in (*.png *.jpg *.jpeg *.gif *.bmp) do (
    cwebp -q 80 -alpha_q 100 "%%f" -o "%%~nf.webp"
)
