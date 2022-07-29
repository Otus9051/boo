<p align="center">
  <img src=".github/assets/nya.png" alt="Boo logo"
  width="200" 
  height="200" />
</p>

## Boo Browser
![GitHub Downloads](https://img.shields.io/github/downloads/Otus9051/boo/total?color=%23497FFF&label=Downloads)
![GitHub Stars](https://img.shields.io/github/stars/Otus9051/boo?color=%23497FFF&label=Stars)

Fast, Secure, Beautiful.

## Credits

Thanks to [Wexond](https://github.com/wexond) and [Innatical](https://github.com/skyebrowser/skye) for providing the base for Boo.
Boo is basically a continuation of Skye but with more features and perks and security. This project was made to keep its simplistic and beautiful design, but remove all the proprietary Innatical stuff and add more secure implementations of it, and ofcourse to continue updating it.

## Development

This project is based on Typescript and Electron and uses the Yarn package manager. To compile it, run 
```
yarn run compile-linux
```
It compiles both x64 and aarch64 binaries in deb, AppImage and RPM and a source tar.gz.

```
yarn run compile-darwin
```
It compiles macOS binaries

```
yarn run compile-win32
```
It compiles Windows binaries
