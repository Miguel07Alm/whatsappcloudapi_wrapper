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
        it('should send a text message', async () => {
            const response = await whatsappCloud.sendText({
                message: 'Hello, this is a test message',
                recipientPhone: process.env.RECIPIENTPHONE!,
            });

            expect(response.status).toBe('success');
        });

        it('should throw an error if recipient phone number is missing', async () => {
            try {
                await whatsappCloud.sendText({
                    message: 'Message without recipient',
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
        it('should send an image from a URL', async () => {
            const response = await whatsappCloud.sendImage({
                recipientPhone: process.env.RECIPIENTPHONE!,
                caption: 'Test Image',
                url: 'https://raw.githubusercontent.com/DaggieBlanqx/whatsappcloudapi_wrapper/main/static_files/379234-whatsapp-cloud-api.jpeg',
            });

            expect(response.response.status).toBe('success');
        });

        it('should throw an error if neither file_path nor URL is provided', async () => {
            try {
                await whatsappCloud.sendImage({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                    caption: 'Image without file or URL',
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an image in your "file_path" or an image in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });
    });

    describe('sendAudio', () => {
        it('should throw an error if neither file_path nor URL is provided', async () => {
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
        it('should throw an error if both file_path and URL are provided', async () => {
            try {
                await whatsappCloud.sendAudio({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                    file_path: '',
                    url: '',
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an audio in your "file_path" or an audio in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });

        it('should send an audio from the file_path', async () => {
            const response = await whatsappCloud.sendAudio({
                recipientPhone: process.env.RECIPIENTPHONE!,
                file_path: 'example.aac',
            });
            expect(response.response.status).toBe('success');
        });
    });
    describe('sendVideo', () => {
        it('should throw an error if neither file_path nor URL is provided', async () => {
            try {
                await whatsappCloud.sendVideo({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an video in your "file_path" or an video in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });
        it('should throw an error if both file_path and URL are provided', async () => {
            try {
                await whatsappCloud.sendVideo({
                    recipientPhone: process.env.RECIPIENTPHONE!,
                    file_path: '',
                    url: '',
                });
            } catch (error) {
                expect(error.message).toBe(
                    'You must send an video in your "file_path" or an video in a publicly available "url". Provide either "file_path" or "url".'
                );
            }
        });

        it('should send a video from the file_path', async () => {
            const response = await whatsappCloud.sendAudio({
                recipientPhone: process.env.RECIPIENTPHONE!,
                file_path: 'example.mp4',
            });
            expect(response.response.status).toBe('success');
        });
    });

});
