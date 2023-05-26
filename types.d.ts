import { Session } from "next-auth";

type LayoutProps = {
    children: React.ReactNode;
}
type ProviderProps = {
    children: React.ReactNode;
    session: Session | null
}
type ButtonProps = {
    session: Session | null
}
type Message = {
    id: string;
    message: string;
    userName: string
    email: string;
    image: string;
    created_at: number;
}
type MesssageComponentProps = {
    messages:{
        id: string;
        message: string;
        userName: string
        email: string;
        image: string;
        created_at: number
    },
    session?: Session | null
}
type MessageListsProps = {
    serverMessages: Message[]
}