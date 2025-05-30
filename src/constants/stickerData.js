export const availableReactions = [
  { emoji: '👍', name: 'thumbs_up' },
  { emoji: '❤️', name: 'heart' },
  { emoji: '😂', name: 'laugh' },
  { emoji: '😮', name: 'wow' },
  { emoji: '😢', name: 'sad' },
  { emoji: '😡', name: 'angry' }
]

export const stickerCategories = {
  emotions: {
    name: 'Emotions',
    icon: 'Smile',
    stickers: [
      { id: 'happy', name: 'Happy', url: 'https://images.unsplash.com/photo-1642425149556-b6f90e946859?w=100&h=100&fit=crop' },
      { id: 'sad', name: 'Sad', url: 'https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?w=100&h=100&fit=crop' },
      { id: 'love', name: 'Love', url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=100&h=100&fit=crop' },
      { id: 'laugh', name: 'Laugh', url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop' },
      { id: 'angry', name: 'Angry', url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop' },
      { id: 'surprised', name: 'Surprised', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop' },
      { id: 'excited', name: 'Excited', url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=100&h=100&fit=crop' },
      { id: 'cool', name: 'Cool', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
    ]
  },
  animals: {
    name: 'Animals',
    icon: 'Heart',
    stickers: [
      { id: 'cat', name: 'Cat', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop' },
      { id: 'dog', name: 'Dog', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop' },
      { id: 'panda', name: 'Panda', url: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=100&h=100&fit=crop' },
      { id: 'lion', name: 'Lion', url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=100&h=100&fit=crop' },
      { id: 'rabbit', name: 'Rabbit', url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&h=100&fit=crop' },
      { id: 'elephant', name: 'Elephant', url: 'https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?w=100&h=100&fit=crop' },
      { id: 'monkey', name: 'Monkey', url: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=100&h=100&fit=crop' },
      { id: 'bear', name: 'Bear', url: 'https://images.unsplash.com/photo-1446824505046-e43605ffb17f?w=100&h=100&fit=crop' }
    ]
  },
  food: {
    name: 'Food',
    icon: 'Coffee',
    stickers: [
      { id: 'pizza', name: 'Pizza', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=100&h=100&fit=crop' },
      { id: 'burger', name: 'Burger', url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=100&h=100&fit=crop' },
      { id: 'coffee', name: 'Coffee', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=100&h=100&fit=crop' },
      { id: 'cake', name: 'Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop' },
      { id: 'apple', name: 'Apple', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=100&h=100&fit=crop' },
      { id: 'icecream', name: 'Ice Cream', url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=100&h=100&fit=crop' },
      { id: 'donut', name: 'Donut', url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop' },
      { id: 'sushi', name: 'Sushi', url: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=100&h=100&fit=crop' }
    ]
  },
  actions: {
    name: 'Actions',
    icon: 'Zap',
    stickers: [
      { id: 'thumbsup', name: 'Thumbs Up', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop' },
      { id: 'clap', name: 'Clap', url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop' },
      { id: 'wave', name: 'Wave', url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop' },
      { id: 'dance', name: 'Dance', url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=100&h=100&fit=crop' },
      { id: 'run', name: 'Run', url: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=100&h=100&fit=crop' },
      { id: 'sleep', name: 'Sleep', url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop' },
      { id: 'thinking', name: 'Thinking', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
      { id: 'peace', name: 'Peace', url: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=100&h=100&fit=crop' }
    ]
  },
  celebrations: {
    name: 'Celebrations',
    icon: 'Star',
    stickers: [
      { id: 'party', name: 'Party', url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=100&h=100&fit=crop' },
      { id: 'gift', name: 'Gift', url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=100&h=100&fit=crop' },
      { id: 'fireworks', name: 'Fireworks', url: 'https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=100&h=100&fit=crop' },
      { id: 'birthday', name: 'Birthday', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop' },
      { id: 'star', name: 'Star', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=100&h=100&fit=crop' },
      { id: 'trophy', name: 'Trophy', url: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=100&h=100&fit=crop' },
      { id: 'confetti', name: 'Confetti', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop' },
      { id: 'champagne', name: 'Champagne', url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=100&h=100&fit=crop' }
    ]
  },
  nature: {
    name: 'Nature',
    icon: 'TreePine',
    stickers: [
      { id: 'flower', name: 'Flower', url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&h=100&fit=crop' },
      { id: 'tree', name: 'Tree', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop' },
      { id: 'sun', name: 'Sun', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop' },
      { id: 'moon', name: 'Moon', url: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=100&fit=crop' },
      { id: 'rainbow', name: 'Rainbow', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=100&h=100&fit=crop' },
      { id: 'mountain', name: 'Mountain', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop' },
      { id: 'ocean', name: 'Ocean', url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=100&h=100&fit=crop' },
      { id: 'butterfly', name: 'Butterfly', url: 'https://images.unsplash.com/photo-1444927714506-8492d94b5ba0?w=100&h=100&fit=crop' }
    ]
  }
}