export const ParticipantModel = {
  Customer: 'customer',
  User: 'user',
  Bot: 'bot',
  System: 'system',
} as const

export type ParticipantModel =
  (typeof ParticipantModel)[keyof typeof ParticipantModel]
