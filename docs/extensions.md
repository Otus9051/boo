# Extensions

Boo has partial support for Chrome extensions (see [#110](https://github.com/wexond/desktop/issues/110)). You may notice some issues when adding attempting to add and/or use an extension. These issues are yet to be fixed. If you've discovered a new problem, please submit an issue on this git repository.

# Installing an extension

To install an extension, you will need to extract the `crx` file of the extension and put the extracted folder to `extensions` directory. Alternatively, you can click the three dots on your browser toolbar, followed by Extensions (which will bring you to the Google Webstore), and then you can click "Add to Boo Browser" on an extension. The "Add to Boo Browser" button will not change, but it should add it. You can uninstall the extension by right-clicking the extension icon on your toolbar, followed by clicking "Uninstall".

The `extensions` directory paths:

- On Linux and macOS: `~/.boo/extensions`
- On Windows: `%USERPROFILE%/.boo/extensions`
