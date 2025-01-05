<h1 align="center">
    <a href="https://github.com/bibekbhusal0/chrome-extension">
        <img src="./public/icon-128.png" width="50">
    </a>
    <br>
    WidTab
</h1>

<div align="center">
    WidTab is a chrome extension which allows you to customize new tab by adding various widgets and creating different themes.
</div>

<div align="center">

![License](https://img.shields.io/github/license/bibekbhusal0/chrome-extension)
![Last Commit](https://img.shields.io/github/last-commit/bibekbhusal0/chrome-extension)

<!-- ![GitHub contributors](https://img.shields.io/github/contributors/bibekbhusal0/chrome-extension)
![GitHub stars](https://img.shields.io/github/stars/bibekbhusal0/chrome-extension)
![GitHub forks](https://img.shields.io/github/forks/bibekbhusal0/chrome-extension) -->

</div>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-installation-guide">Installation Guide</a>
<br>
  <a href="#-contributing">Contributing</a> •
  <a href="#-issues-and-support">Issues and Support</a> •
  <a href="#-license">License</a>
</p>

## Important Links

#### **Github**: https://github.com/bibekbhusal0/chrome-extension

#### **Live** : https://bibekbhusal0.github.io/chrome-extension/

<!-- #### **Firefox Addon Store**: releasing soon -->
<!-- #### **Chrome extension**: releasing soon -->

## ✨ Features

- **Customizable Themes**: Create multiple themes to match your style, each theme is fully customizable.
- **Widgets**: Add widget from many different types of widget.
- **Multiple Spaces**: Create multiple spaces, each space can contain many widgets.
- **Dock**: Dock can allow to quickly navigate between spaces and links.

### Different widgets

- **Search**
- **Clock**
- **Calendar**
- **Timer**
- **Bookmark**
- **Note**
- **TodoList**
- **Habit Tracker**
- **Gemini**
- **Custom** (embed any website you like)

### Dynamic and Static widgets

In dynamic space, different widgets can be added and moved around. There can be many Dynamic Spaces.
Static space can't be customized as dynamic space it contains all bookmark or all notes or all habit trackers or all todo list. New Static space can't be added.

## 📥 Installation Guide

### Download

Download Latest build for you browser (chrome or firefox) from [Build Page](https://github.com/BibekBhusal0/chrome-extension/actions)

---

### Build yourself

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/bibekbhusal0/chrome-extension.git
   ```

2. **Install all required packages**:

   ```bash
   npm install
   ```

3. **Run the build**:

   For firefox based browser

   ```bash
   npm run build:firefox
   ```

   For Chromium based browser

   ```bash
   npm run build:chrome
   ```

### Installation

#### ![Chromium](https://img.icons8.com/?size=20&id=104996&format=png&color=000000) Chromium-Based Browsers

<!-- Will be available on we store soon -->
<!-- 1. **Install from Chrome Web Store**:

   - [Chrome Web Store link]()

   **Or** follow the manual steps below: -->

2. **Manual Installation**:

   - Build the extension or downloaded zip files from actions page.

   - **Open Extensions Page**:
     Open your preferred browser and enter the following text in the address bar

     - ![Chrome](https://img.icons8.com/color/20/000000/chrome--v1.png) Chrome: `chrome://extensions`

     - ![Edge](https://img.icons8.com/?size=20&id=dGm9KIZPpukc&format=png&color=000000) Edge: `edge://extensions`

     - ![Brave](https://img.icons8.com/color/20/000000/brave-web-browser.png) Brave: `brave://extensions`

     - ![Opera](https://img.icons8.com/color/20/000000/opera--v1.png) Opera: `opera://extensions`

   - **Enable Developer Mode**:

     - Turn on **Developer Mode** in the extensions page.

   - **Load Unpacked Extension**:
     - Click on **Load unpacked** and select your extracted extension folder.

---

#### ![Firefox](https://img.icons8.com/color/20/000000/firefox--v1.png) Firefox

<!-- 1. **Install from Mozilla Extensions Store**:

   - [Mozilla Add-ons link]()

**Or** follow the manual steps below: -->

2. **Manual Installation**:

   - Build the extension or downloaded zip files from actions page.

   - **Load Temporary Add-on**:
     - Go to `about:debugging#/runtime/this-firefox`, select **"This Firefox"**, then click **Load Temporary Add-on**.
     - Browse and select the updated `manifest.json`.

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. Follow the guidelines in the [CONTRIBUTING.md](./CONTRIBUTING.md) file.
2. Fork the repository.
3. Create a feature branch: `git checkout -b feature/YourFeature`.
4. Commit your changes: `git commit -m 'Add Your Feature'`.
5. Push to the branch: `git push origin feature/YourFeature`.
6. Open a pull request.

## ❓ Issues and Support

If you encounter any bugs or issues, please [submit an issue](https://github.com/bibekbhusal0/chrome-extension/issues) on the GitHub repository.

<!-- ## 🔒 Privacy Policy -->

## Tech Docs

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Vite Plugin](https://vitejs.dev/guide/api-plugin.html)
- [Chrome Extension with manifest 3](https://developer.chrome.com/docs/extensions/mv3/)
- [Rollup](https://rollupjs.org/guide/en/)
- [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin)
- [Tailwind CSS](https://tailwindcss.com/docs/configuration)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [Material UI](https://mui.com/material-ui/getting-started/)

## 📜 License

[MIT](./LICENSE)

### [Credit](./credits.md)
