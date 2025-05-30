export const contacts = [
  { 
    id: 'alex-j', 
    name: 'Alex Johnson', 
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 
    lastSeen: new Date(), 
    isOnline: true 
  },
  { 
    id: 'sarah-m', 
    name: 'Sarah Miller', 
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=150&h=150&fit=crop&crop=face', 
    lastSeen: new Date(Date.now() - 300000), 
    isOnline: true 
  },
  { 
    id: 'mike-r', 
    name: 'Mike Rodriguez', 
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 
    lastSeen: new Date(Date.now() - 1800000), 
    isOnline: false 
  },
  { 
    id: 'team-dev', 
    name: 'Dev Team', 
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face', 
    lastSeen: new Date(), 
    isOnline: true, 
    isGroup: true 
  }
]

export const initialConversations = [
  { id: 'alex-j', lastMessage: 'Hey! How are you doing?', timestamp: new Date(Date.now() - 120000), unread: 2 },
  { id: 'sarah-m', lastMessage: 'Perfect! See you tomorrow 👍', timestamp: new Date(Date.now() - 300000), unread: 0 },
  { id: 'mike-r', lastMessage: 'Thanks for the help!', timestamp: new Date(Date.now() - 1800000), unread: 1 },
  { id: 'team-dev', lastMessage: 'New release is ready 🚀', timestamp: new Date(Date.now() - 3600000), unread: 5 }
]

export const initialMessages = {
  'alex-j': [
    { id: '1', senderId: 'alex-j', content: 'Hey there! How are you doing?', timestamp: new Date(Date.now() - 180000), isRead: true },
    { id: '2', senderId: 'me', content: 'Hi Alex! I\'m doing great, thanks for asking!', timestamp: new Date(Date.now() - 150000), isRead: true },
    { id: '3', senderId: 'alex-j', content: 'That\'s awesome! Want to grab coffee later?', timestamp: new Date(Date.now() - 120000), isRead: false }
  ],
  'sarah-m': [
    { id: '1', senderId: 'me', content: 'Are we still on for the meeting tomorrow?', timestamp: new Date(Date.now() - 320000), isRead: true },
    { id: '2', senderId: 'sarah-m', content: 'Yes! 10 AM sharp. I\'ll prepare the presentation.', timestamp: new Date(Date.now() - 310000), isRead: true },
    { id: '3', senderId: 'sarah-m', content: 'Perfect! See you tomorrow 👍', timestamp: new Date(Date.now() - 300000), isRead: true }
  ],
  'mike-r': [
    { id: '1', senderId: 'mike-r', content: 'Thanks for helping me with the project!', timestamp: new Date(Date.now() - 1800000), isRead: false }
  ],
  'team-dev': [
    { id: '1', senderId: 'sarah-m', content: 'New release is ready 🚀', timestamp: new Date(Date.now() - 3700000), isRead: true },
    { id: '2', senderId: 'alex-j', content: 'Great work everyone!', timestamp: new Date(Date.now() - 3650000), isRead: true },
    { id: '3', senderId: 'mike-r', content: 'Testing completed successfully ✅', timestamp: new Date(Date.now() - 3600000), isRead: false }
  ]
}