import { IconGoogle, IconGithub } from '#components';

export enum AuthProvider {
  GOOGLE = 'google',
  GITHUB = 'github'
}

export const AuthProviderValues = Object.values(AuthProvider) as unknown as [
  keyof typeof AuthProvider
];

export const authProviderIconMap: Record<string, Component> = {
  [AuthProvider.GOOGLE]: IconGoogle,
  [AuthProvider.GITHUB]: IconGithub
};
