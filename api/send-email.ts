import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

const sesClient = new SESClient({
    region: process.env.AWS_REGION
})

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" })
    }

    const { to, subject, message } = req.body

    if (!to || !subject || !message) {
        return res.status(400).json({ error: "Faltan datos" })
    }
    const command = new SendEmailCommand({
        Source: process.env.SES_FROM_EMAIL,
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Subject: {
                Data: subject
            },
            Body: {
                Text: {
                    Data: message
                }
            }
        }
    })
    try {
        await sesClient.send(command)

        return res.status(200).json({
            message: "Correo enviado correctamente"
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Error al enviar el correo"
        })
    }

}