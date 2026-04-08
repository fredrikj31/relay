export type Reaction = {
  emoji: string;
  count: number;
  reacted: boolean;
};

export type PollOption = {
  id: string;
  label: string;
  votes: number;
};

export type Poll = {
  question: string;
  options: PollOption[];
  totalVotes: number;
  voted: string | null;
};

export type Message = {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: "text" | "poll" | "image";
  reactions?: Reaction[];
  poll?: Poll;
  imageUrl?: string;
  imageAlt?: string;
  isOwn: boolean;
};

export type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    avatar: "SM",
    lastMessage: "Sounds great, see you then!",
    timestamp: "10:42 AM",
    unread: 2,
    online: true,
    messages: [
      {
        id: "m1",
        senderId: "sarah",
        senderName: "Sarah Mitchell",
        content: "Hey! Are you free for lunch tomorrow?",
        timestamp: "10:30 AM",
        type: "text",
        isOwn: false,
        reactions: [{ emoji: "❤️", count: 1, reacted: true }],
      },
      {
        id: "m2",
        senderId: "me",
        senderName: "You",
        content: "Yeah totally, where were you thinking?",
        timestamp: "10:35 AM",
        type: "text",
        isOwn: true,
      },
      {
        id: "m3",
        senderId: "sarah",
        senderName: "Sarah Mitchell",
        content: "There's a new Italian place on 5th. Supposed to be amazing!",
        timestamp: "10:38 AM",
        type: "text",
        isOwn: false,
        reactions: [
          { emoji: "👍", count: 2, reacted: false },
          { emoji: "😍", count: 1, reacted: true },
        ],
      },
      {
        id: "m4",
        senderId: "sarah",
        senderName: "Sarah Mitchell",
        content: "",
        timestamp: "10:39 AM",
        type: "image",
        isOwn: false,
        imageUrl: "/placeholder.svg?height=280&width=420",
        imageAlt: "Photo from Sarah",
        reactions: [{ emoji: "😍", count: 2, reacted: true }],
      },
      {
        id: "m5",
        senderId: "me",
        senderName: "You",
        content: "Perfect, I've been wanting to try that place. 12:30?",
        timestamp: "10:40 AM",
        type: "text",
        isOwn: true,
      },
      {
        id: "m6",
        senderId: "sarah",
        senderName: "Sarah Mitchell",
        content: "Sounds great, see you then!",
        timestamp: "10:42 AM",
        type: "text",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    name: "Design Team",
    avatar: "DT",
    lastMessage: "Jordan: Just pushed the new mockups",
    timestamp: "9:15 AM",
    unread: 5,
    online: false,
    isGroup: true,
    messages: [
      {
        id: "m1",
        senderId: "jordan",
        senderName: "Jordan",
        content: "Morning everyone! Quick question before our standup.",
        timestamp: "9:00 AM",
        type: "text",
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "jordan",
        senderName: "Jordan",
        content: "Which direction should we go for the new dashboard?",
        timestamp: "9:01 AM",
        type: "poll",
        isOwn: false,
        poll: {
          question: "Which dashboard direction do you prefer?",
          options: [
            { id: "a", label: "Minimal & Clean", votes: 4 },
            { id: "b", label: "Data-heavy with charts", votes: 2 },
            { id: "c", label: "Card-based layout", votes: 3 },
          ],
          totalVotes: 9,
          voted: "a",
        },
      },
      {
        id: "m3",
        senderId: "me",
        senderName: "You",
        content: "I voted for Minimal & Clean. Keeps things focused.",
        timestamp: "9:05 AM",
        type: "text",
        isOwn: true,
        reactions: [{ emoji: "👍", count: 3, reacted: false }],
      },
      {
        id: "m4",
        senderId: "alex",
        senderName: "Alex",
        content: "Agreed. We can always add complexity later.",
        timestamp: "9:08 AM",
        type: "text",
        isOwn: false,
        reactions: [{ emoji: "💯", count: 2, reacted: true }],
      },
      {
        id: "m5",
        senderId: "jordan",
        senderName: "Jordan",
        content: "Just pushed the new mockups",
        timestamp: "9:15 AM",
        type: "text",
        isOwn: false,
      },
      {
        id: "m6",
        senderId: "jordan",
        senderName: "Jordan",
        content: "",
        timestamp: "9:16 AM",
        type: "image",
        isOwn: false,
        imageUrl: "/placeholder.svg?height=260&width=400",
        imageAlt: "Dashboard mockup from Jordan",
      },
      {
        id: "m7",
        senderId: "me",
        senderName: "You",
        content: "",
        timestamp: "9:20 AM",
        type: "image",
        isOwn: true,
        imageUrl: "/placeholder.svg?height=240&width=380",
        imageAlt: "My reference screenshot",
        reactions: [{ emoji: "👍", count: 2, reacted: false }],
      },
    ],
  },
  {
    id: "3",
    name: "Marcus Chen",
    avatar: "MC",
    lastMessage: "The PR is ready for review",
    timestamp: "Yesterday",
    unread: 0,
    online: true,
    messages: [
      {
        id: "m1",
        senderId: "me",
        senderName: "You",
        content: "Hey Marcus, did you finish the auth module?",
        timestamp: "Yesterday 3:00 PM",
        type: "text",
        isOwn: true,
      },
      {
        id: "m2",
        senderId: "marcus",
        senderName: "Marcus Chen",
        content: "Almost there! Just need to add token refresh logic.",
        timestamp: "Yesterday 3:20 PM",
        type: "text",
        isOwn: false,
        reactions: [{ emoji: "👀", count: 1, reacted: false }],
      },
      {
        id: "m3",
        senderId: "marcus",
        senderName: "Marcus Chen",
        content: "The PR is ready for review",
        timestamp: "Yesterday 5:45 PM",
        type: "text",
        isOwn: false,
      },
    ],
  },
  {
    id: "4",
    name: "Priya Sharma",
    avatar: "PS",
    lastMessage: "Can we reschedule the call?",
    timestamp: "Yesterday",
    unread: 1,
    online: false,
    messages: [
      {
        id: "m1",
        senderId: "priya",
        senderName: "Priya Sharma",
        content: "Hi! Just checking in about the project timeline.",
        timestamp: "Yesterday 11:00 AM",
        type: "text",
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "me",
        senderName: "You",
        content: "We're on track! Should finish by end of week.",
        timestamp: "Yesterday 11:15 AM",
        type: "text",
        isOwn: true,
        reactions: [{ emoji: "🎉", count: 1, reacted: false }],
      },
      {
        id: "m3",
        senderId: "priya",
        senderName: "Priya Sharma",
        content: "Can we reschedule the call?",
        timestamp: "Yesterday 4:30 PM",
        type: "text",
        isOwn: false,
      },
    ],
  },
  {
    id: "5",
    name: "Weekend Plans",
    avatar: "WP",
    lastMessage: "Tom: I'll bring the snacks!",
    timestamp: "Mon",
    unread: 0,
    online: false,
    isGroup: true,
    messages: [
      {
        id: "m1",
        senderId: "tom",
        senderName: "Tom",
        content: "Anyone up for hiking this weekend?",
        timestamp: "Mon 8:00 AM",
        type: "text",
        isOwn: false,
        reactions: [
          { emoji: "🥾", count: 3, reacted: true },
          { emoji: "❤️", count: 2, reacted: false },
        ],
      },
      {
        id: "m2",
        senderId: "lisa",
        senderName: "Lisa",
        content: "Which trail should we do?",
        timestamp: "Mon 8:10 AM",
        type: "poll",
        isOwn: false,
        poll: {
          question: "Which trail this weekend?",
          options: [
            { id: "a", label: "Blue Ridge Trail (Easy)", votes: 1 },
            { id: "b", label: "Summit Peak (Hard)", votes: 3 },
            { id: "c", label: "River Loop (Medium)", votes: 2 },
          ],
          totalVotes: 6,
          voted: null,
        },
      },
      {
        id: "m3",
        senderId: "me",
        senderName: "You",
        content: "Summit Peak sounds like a challenge. I'm in!",
        timestamp: "Mon 8:30 AM",
        type: "text",
        isOwn: true,
      },
      {
        id: "m4",
        senderId: "tom",
        senderName: "Tom",
        content: "I'll bring the snacks!",
        timestamp: "Mon 9:00 AM",
        type: "text",
        isOwn: false,
        reactions: [{ emoji: "🙌", count: 4, reacted: true }],
      },
    ],
  },
  {
    id: "6",
    name: "Elena Kovacs",
    avatar: "EK",
    lastMessage: "Thanks for the help!",
    timestamp: "Sun",
    unread: 0,
    online: false,
    messages: [
      {
        id: "m1",
        senderId: "elena",
        senderName: "Elena Kovacs",
        content: "Could you help me understand this error?",
        timestamp: "Sun 2:00 PM",
        type: "text",
        isOwn: false,
      },
      {
        id: "m2",
        senderId: "me",
        senderName: "You",
        content:
          "Sure! It looks like a null pointer exception. Try checking if the object is initialized before accessing it.",
        timestamp: "Sun 2:15 PM",
        type: "text",
        isOwn: true,
      },
      {
        id: "m3",
        senderId: "elena",
        senderName: "Elena Kovacs",
        content: "Thanks for the help!",
        timestamp: "Sun 2:20 PM",
        type: "text",
        isOwn: false,
        reactions: [{ emoji: "❤️", count: 1, reacted: false }],
      },
    ],
  },
];
