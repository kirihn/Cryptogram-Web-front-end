export function GetContextPosition(
    menuWidth: number,
    menuHeight: number,
    event: React.MouseEvent<HTMLDivElement>,
): { x: number; y: number } {
    menuWidth += 15;
    menuHeight += 15;

    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    let x = event.pageX + 5;
    let y = event.pageY + 5;

    if (x + menuWidth > pageWidth) {
        x = pageWidth - menuWidth;
    }

    if (y + menuHeight > pageHeight) {
        y = pageHeight - menuHeight;
    }

    return { x, y };
}
