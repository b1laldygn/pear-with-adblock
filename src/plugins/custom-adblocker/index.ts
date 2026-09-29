import style from './style.css?inline';
import { createPlugin } from '@/utils';

export default createPlugin({
  name: () => 'Custom AdBlocker',
  description: () => 'Custom adblocker and skip script',
  restartNeeded: false,
  config: {
    enabled: true,
  },
  stylesheets: [style],
  renderer: {
    start() {
      console.log('Custom AdBlocker başarıyla çalışıyor');

      // Reklam atlama ve hızlandırma mantığı
      setInterval(() => {
        // 1. Reklam Atla (Skip Ad) Butonlarına Tıklama
        const skipButton = document.querySelector(
          '.ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button, .ytp-ad-skip-button-slot'
        ) as HTMLElement | null;

        if (skipButton) {
          skipButton.click();
        }

        // 2. Reklam Gösteriliyorsa Videoyu Sona Sarma
        const adShowing = document.querySelector('.ad-showing, .ad-interrupting');
        const video = document.querySelector('video');

        if (adShowing && video && !isNaN(video.duration)) {
          video.currentTime = video.duration;
        }
      }, 500);
    },
  },
});
