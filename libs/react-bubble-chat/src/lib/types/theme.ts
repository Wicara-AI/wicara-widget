
export const ModalVariant = {
  BASIC: 'basic',
  ROUNDED: 'rounded',
  SHADOW: 'shadow',
} as const;

export type ModalVariant = typeof ModalVariant[keyof typeof ModalVariant];

export const ButtonVariant = {
  ICON: 'icon',
  DETAILED: 'detailed',
} as const;

export type ButtonVariant = typeof ButtonVariant[keyof typeof ButtonVariant];

export type ButtonTheme = {
  variant: ButtonVariant;
};

export type ModalTheme = {
  variant: ModalVariant;
};

export type Theme = {
  primaryColor: string;
  secondaryColor: string;
  button: ButtonTheme;
  modal: ModalTheme;
};
