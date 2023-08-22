const UserSchema = {
  name: 'User',
  primaryKey: 'username',
  properties: {
    username: 'string',
    password: 'string',
    email: 'string',
    firstName: 'string?',
    lastName: 'string?',
    handle: 'string?',
    avatar: 'string?',
    dateOfBirth: 'date?',
    gender: 'string?',
    metrics: 'string?', 
    fitnessGoals: 'string[]',
    dietaryRequirements: 'string[]',
    allergies: 'string[]',
    preferredCuisine: 'string[]',
    points: 'string?', 
    subscription: 'object?',
    lastLogin: 'date',
    mealPlans: 'string[]?', 
    workoutPlans: 'string[]?', 
    aiChats: 'string[]?', 
    accountCreated: 'date',
    theme: 'string?',
  },
};

export const canBeSynced = true;

export default UserSchema;