export interface Message {
    id: number;
    senderId: number;
    senderFirstName: string;
    senderLastName: string;
    senderPhotoUrl: string;
    receiverId: number;
    receiverFirstName: string;
    receiverLastName: string;
    receiverPhotoUrl: string;
    text: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
      
}
