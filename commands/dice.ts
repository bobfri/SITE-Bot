import { Command, CommandDefinition, Message } from ".";

// Functions used by this command
// ==============================

/**
 * Uses a regex to extract the first number given by the user.
 * @param content The message provided by the user.
 */
function parseDieSize(content: string): number {
  const match = content.match(/\d+/);
  if (match && match[0]) {
    const num = parseInt(match[0]);
    console.log(`Got a die size: ${num}`);
    return num;
  }
  return 0;
}
/**
 * Returns a random number below the maximum.
 * @param max The highest possible roll.
 */
function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max + 1));
}

// Required Command Exports
// ========================

export const description: CommandDefinition = {
  name: "Dice Rollin' Bot",
  key: "roll",
};

export const action = (message: Message) => {
  // Extract die size from message.
  const dieSize = parseDieSize(message.content);
  if (dieSize && dieSize > 1000) {
    message.channel.send(`Ugh, I can't roll a die that size!`);
  } else if (dieSize && dieSize > 0) {
    const result = getRandomInt(dieSize);
    message.channel.send(`Rolling a D${dieSize} -> ${result}`);
  } else {
    const result = getRandomInt(6);
    message.channel.send(`Rolling a D6 -> ${result}`);
  }
};

export const command: Command = {
  definition: description,
  action: action,
};
export default command;