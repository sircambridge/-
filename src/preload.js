// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    // const replaceText = (selector, text) => {
    //   const element = document.getElementById(selector)
    //   if (element) element.innerText = text
    // }
  
    // for (const type of ['chrome', 'node', 'electron']) {
    //   replaceText(`${type}-version`, process.versions[type])
    // }
    // console.log(11123);
  
    document.querySelector('#login_old').addEventListener('click', () => {
      login_old();
    })
    document.querySelector('#login_new').addEventListener('click', () => {
      login_new();
    })

    document.querySelector('#popout').addEventListener('click', () => {
      popout();
    })

    document.querySelector('#search').addEventListener('click', () => {
      search();
    })
    // main()
  })
  
  const { ipcRenderer } = require('electron');

function login_old() {
  ipcRenderer.send('request-mainprocess-action', { message: "login_old", someData: {} });
}
function login_new() {
  ipcRenderer.send('request-mainprocess-action', { message: "login_new", someData: {} });
}
function popout() {
  ipcRenderer.send('request-mainprocess-action', { message: "popout", someData: {} });
}

  function search() {
    // Some data that will be sent to the main process
    let Data = {
      message: "search",
      someData: {
        year: document.querySelector('#year').value,
        month: document.querySelector('#month').value,
        day: document.querySelector('#day').value,
        autobook: document.querySelector('#autobook').checked,
        retry: document.querySelector('#retry').checked,
      }
  };
  // alert(1)
  console.log("SENDING");
  // Send information to the main process
  // if a listener has been set, then the main process
  // will react to the request !
  ipcRenderer.send('request-mainprocess-action', Data);
}

ipcRenderer.on('label2', (event, arg) => {
  console.log('label2',arg); // prints "Hello World!"
  document.querySelector('#label2').innerHTML = arg;
});

ipcRenderer.on('label3', (event, arg) => {
  console.log('label3',arg); // prints "Hello World!"
  document.querySelector('#label3').innerHTML = arg;
});

ipcRenderer.on('code', (event, arg) => {
  console.log(arg);
  try {
    ipcRenderer.send('code', eval(arg));
  } catch (error) {
    console.log(error);
  }
  
});