import { Client, Account } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('679b95f10030c4821c90');

export const account = new Account(client);
export { ID } from 'appwrite';
