import HandsomeManImg from "../../../../../assets/images/mail/Handsome_Man.png";
import { uuid } from "../../../../../common/uuid";

export const MAILS_LIST = [
    {
        id: uuid(),
        senderImg: HandsomeManImg,
        senderName: "Sudhir Sharma",
        from: "sudhirsharma34567@gmail.com",
        subject: "Welcome to My Portfolio",
        content:
            `Hello there!\n\n` +
            `Thank you for visiting my Windows-style portfolio website. I'm delighted to have you here!\n\n` +
            `I'm Sudhir Sharma, a Software Development Engineer passionate about building scalable applications and innovative solutions. This portfolio showcases my work, skills, and projects.\n\n` +
            `Feel free to explore the different sections, check out my projects, or reach out if you'd like to collaborate or have any questions.\n\n` +
            `I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology!\n\n` +
            `Best regards,\n` +
            `Sudhir Sharma\n` +
            `Software Development Engineer`,
        disabledReply: true,
    },
];
