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


    let loremIpsum = vscode.commands.registerCommand('extension.generateLoremIpsum', async () => {
        // Chiedi all'utente il numero di caratteri da generare
        function generateLoremIpsum(charCount: number): string {
            const loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        
            let result = '';
        
            // Ripeti il testo Lorem Ipsum fino a raggiungere il numero di caratteri richiesto
            while (result.length < charCount) {
                result += loremIpsumText;
            }
        
            // Taglia il testo per ottenere esattamente charCount caratteri
            return result.substring(0, charCount);
        }


        const input = await vscode.window.showInputBox({
            prompt: 'Inserisci il numero di caratteri per il testo Lorem Ipsum',
            validateInput: (value) => {
                const num = parseInt(value);
                return isNaN(num) || num <= 0 ? 'Per favore, inserisci un numero positivo.' : null;
            }
        });

        const numChars = input ? parseInt(input) : null;

        if (numChars && numChars > 0) {
            // Genera il testo Lorem Ipsum
            const loremIpsum = generateLoremIpsum(numChars);

            // Inserisci il testo nell'editor attuale
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const document = editor.document;
                const selection = editor.selection;

                editor.edit(editBuilder => {
                    editBuilder.insert(selection.active, loremIpsum);
                });
            }

            //vscode.window.showInformationMessage('Testo Lorem Ipsum generato con successo!');
        } else {
            vscode.window.showErrorMessage('Numero di caratteri non valido.');
        }
    });



	context.subscriptions.push(basetext);
	context.subscriptions.push(textbase);
	context.subscriptions.push(uridecode);
	context.subscriptions.push(uriencode);
    context.subscriptions.push(loremIpsum);
}




export function deactivate() {}
