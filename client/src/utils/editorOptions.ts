export const editorOptions = {
    toolbarContainer: '#toolbar_container',
    showPathLabel: false,
    charCounter: true,
    maxCharCount: 720,
    width: 'auto',
    maxWidth: '700px',
    height: 'auto',
    minHeight: '100px',
    maxHeight: '250px',
    buttonList: [
        ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
        ['bold', 'underline', 'italic', 'strike', 'removeFormat'],
        '/',
        [
            'fontColor',
            'hiliteColor',
            'outdent',
            'indent',
            'align',
            'horizontalRule',
            'list',
            'table',
        ],
        ['link', 'fullScreen', 'showBlocks', 'preview', 'print'],
    ],
    callBackSave: function (contents, isChanged) {
        console.log(contents)
    },
}
