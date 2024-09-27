// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;


export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "d4n73-utils" is now active!');


	const basetext = vscode.commands.registerCommand('d4n73-utils.textToBase', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

			if(base64regex.test(selectedText)){
				vscode.window.showErrorMessage(`Il testo selezionato è già codificato in base64`);
				return;
			}

			editor.edit(editBuilder => {
                editBuilder.replace(selection, btoa(selectedText));
            });

            vscode.window.showInformationMessage(`Il testo selezionato è stato codificato in base64`);
        }
    });

	const textbase = vscode.commands.registerCommand('d4n73-utils.baseToText', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

			if(!base64regex.test(selectedText)){
				vscode.window.showErrorMessage(`Il testo selezionato non è codificato in base64`);
				return;
			}

			editor.edit(editBuilder => {
                editBuilder.replace(selection, atob(selectedText));
            });

            vscode.window.showInformationMessage(`Il testo selezionato è stato codificato in testo`);
        }
    });

	const uriencode = vscode.commands.registerCommand('d4n73-utils.uriEncode', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);


			editor.edit(editBuilder => {
                editBuilder.replace(selection, encodeURIComponent(selectedText));
            });

            vscode.window.showInformationMessage(`Il testo selezionato è stato codificato in testo`);
        }
    });

	const uridecode = vscode.commands.registerCommand('d4n73-utils.uriDecodde', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const selection = editor.selection;
            const selectedText = editor.document.getText(selection);

			editor.edit(editBuilder => {
                editBuilder.replace(selection, decodeURIComponent(selectedText));
            });

            vscode.window.showInformationMessage(`Il testo selezionato è stato codificato in testo`);
        }
    });




	context.subscriptions.push(basetext);
	context.subscriptions.push(textbase);
	context.subscriptions.push(uridecode);
	context.subscriptions.push(uriencode);
}




export function deactivate() {}
