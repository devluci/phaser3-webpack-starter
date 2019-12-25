import * as sentry from '@sentry/browser';
import Phaser from 'phaser';
import * as report from 'utils/report';
import '../css/main.css';
import '../css/normalize.css';


if (process.env.GA_ID) {
  const gaId = process.env.GA_ID;
  const gaScript = document.createElement('script');
  gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  gaScript.async = true;
  document.head.appendChild(gaScript);

  const gaInit = document.createElement('script');
  gaInit.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', '${gaId}');
  `;
  document.head.appendChild(gaInit);
}


if (process.env.SENTRY_HOST) {
  sentry.init({dsn: process.env.SENTRY_HOST});
  report.enable();
}


function init(): void {
  const parent = document.getElementById('game') as HTMLElement;
  const notSupported = document.getElementById('not-supported')!;

  notSupported.classList.remove('temp-hidden');

  document.addEventListener('contextmenu', (ev) => ev.preventDefault());

  const game: Phaser.Game = new Phaser.Game({
    banner: false,
    parent,
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    input: {
      activePointers: 3,
    },
  });

  if (
    !(game.device.features.canvas || game.device.features.webGL)
  ) {
    parent.classList.add('hidden');
    notSupported.classList.remove('hidden');
    game.destroy(true, true);
    return;
  }

  // const scene = new Scene('');
  // game.scene.add('Scene', scene, true);
  game.events.on('step', () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (game.scale.width !== screenWidth || game.scale.height !== screenHeight) {
      game.scale.resize(screenWidth, screenHeight);
    }
  });
}


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
