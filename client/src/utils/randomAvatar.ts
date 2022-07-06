export const randomAvatar = (): string => {
    const images = [
        'https://img.icons8.com/emoji/344/hippopotamus-emoji.png',
        'https://img.icons8.com/emoji/344/raccoon.png',
        'https://img.icons8.com/emoji/344/wolf-emoji.png',
        'https://img.icons8.com/emoji/344/tiger-face.png',
        'https://img.icons8.com/emoji/344/turtle-emoji.png',
        'https://img.icons8.com/emoji/344/sloth-emoji.png',
        'https://img.icons8.com/emoji/344/llama-emoji.png',
        'https://img.icons8.com/emoji/344/cat-face--v1.png',
    ]
    const randomIndex = Math.floor(Math.random() * images.length)
    return images[randomIndex]
}
