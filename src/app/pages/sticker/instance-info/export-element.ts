import { drawDOM, exportImage, Group, ImageExportOptions } from '@progress/kendo-drawing';
import { saveAs } from '@progress/kendo-file-saver';

export function exportElement(element: HTMLElement, imageName: string, options?: ImageExportOptions) {
    drawDOM(element).then((group: Group) => {
        return exportImage(group, options);
    }).then((data) => {
        saveAs(data, `${imageName}.png`);
    });
}
