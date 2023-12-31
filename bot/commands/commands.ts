interface Commands {
    command: string;
    description: string;
}

export const COMMANDS: Commands[] = [
    { command: 'start', description: 'Start interacting with the bot' },
    { command: 'help', description: 'Show help text' },
    { command: 'davinci', description: 'Start converstaion with davinci AI' },
    { command: 'cancel', description: 'Cancel converstaion' },
];
