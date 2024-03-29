import WhatsappCloudAPI from './index';
require('dotenv').config();

describe('WhatsappCloud', () => {
    let whatsappCloud: WhatsappCloudAPI;

    beforeEach(() => {
        whatsappCloud = new WhatsappCloudAPI({
            accessToken: process.env.Meta_WA_accessToken!,
            senderPhoneNumberId: process.env.Meta_WA_SenderPhoneNumberId!,
            WABA_ID: process.env.Meta_WA_wabaId!,
            graphAPIVersion: 'v19.0',
        });
    });

    describe('sendText', () => {
        it('debería enviar un mensaje de texto', async () => {
            const response = await whatsappCloud.sendText({
                message: 'Hola, este es un mensaje de prueba',
                recipientPhone: process.env.RECIPIENTPHONE!,
            });

            expect(response.status).toBe('success');
        });

        it('debería lanzar un error si falta el número de teléfono del destinatario', async () => {
            try {
                await whatsappCloud.sendText({
                    message: 'Mensaje sin destinatario',
                    recipientPhone: '',
                });
            } catch (error) {
                expect(error.message).toBe(
                    '"recipientPhone" is required in making a request'
                );
            }
        });
    });

    describe('sendImage', () => {
        it('debería enviar una imagen desde una URL', async () => {
            const response = await whatsappCloud.sendImage({
                recipientPhone: process.env.RECIPIENTPHONE!,
                caption: 'Imagen de prueba',
                url: 'https://raw.githubusercontent.com/DaggieBlanqx/whatsappcloudapi_wrapper/main/static_files/379234-whatsapp-cloud-api.jpeg',
            });

            expect(response.response.status).toBe('success');
        });

        it('debería lanzar un error si no se proporciona ni file_path ni url', async () => {
            try {
                await whatsappCloud.sendImage({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                    caption: 'Imagen sin archivo ni URL',
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an image in your "file_path" or an image in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });
    });

    describe('sendAudio', () => {
        it('debería lanzar un error si no se proporciona ni file_path ni url', async () => {
            try {
                await whatsappCloud.sendAudio({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an audio in your "file_path" or an audio in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });
        it('debería lanzar un error si se proporciona el file_path y la url', async () => {
            try {
                await whatsappCloud.sendAudio({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                    file_path: "",
                    url: ""
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an audio in your "file_path" or an audio in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });

        it('debería enviar un audio desde el file_path', async () => {
            const response = await whatsappCloud.sendAudio({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                    file_path: 'example.aac',
                });
            expect(response.response.status).toBe('success');

            
        });
    });
});
