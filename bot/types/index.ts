import { Context, SessionFlavor } from 'grammy';
import {
    type Conversation,
    type ConversationFlavor,
} from '@grammyjs/conversations';

interface SessionData {
    itemLevel: string;
    isDEGANft: boolean;
}
export type SessionContext = Context & SessionFlavor<SessionData>;
export type BotContext = SessionContext & ConversationFlavor;
export type ConverstaionContext = Conversation<BotContext>;
