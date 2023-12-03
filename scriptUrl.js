const fs = require("fs");
const path = require("path");

const svgDirectory = "assets/substantive/png"; // Укажите путь к директории с png-файлами

const iconAssets = {};

fs.readdirSync(svgDirectory).forEach((filename) => {
  if (path.extname(filename) === ".png") {
    const name = path
      .basename(filename, ".png")
      .replace(/_./g, (match) => ` ${match[1].toUpperCase()}`);
    iconAssets[name] = { name, url: filename };
  }
});

const outputFilePath = path.join(__dirname, "iconAssets.ts"); // Путь к файлу iconAssets.ts

// код для экспорта объекта iconAssets и типизации
const jsCode = `interface IconAsset {
    name: string;
    url: string;
  }
  
  interface IconAssets {
    [key: string]: IconAsset;
  }
  
  export const iconAssets: IconAssets = ${JSON.stringify(
    iconAssets,
    null,
    2
  )};`;

// Записываем код в файл
fs.writeFileSync(outputFilePath, jsCode);

console.log(`Результат сохранен в файл ${outputFilePath}`);
