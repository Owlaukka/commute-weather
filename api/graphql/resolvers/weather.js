const got = require('got');

const weatherResolver = {
  oneCity: async (args, req) => {
    const response = await got('https://jsonplaceholder.typicode.com/posts/1');
    console.log(response.body);
    return response.body;
  },
  add: async ({ x, y }) => x + y,
  // add: async (_, { x, y }) => x + y,
  // events: async (args, req) => {
  //   if (!req.isAuth) {
  //     return await Event.find({ visibleTo: [] });
  //   }
  //   const { userGroups } = await User.findById(req.userId);
  //   const events = await Event.find({
  //     $or: [{ visibleTo: [] }, { visibleTo: { $in: userGroups } }],
  //   });
  //   return events.map(transformEventBase);
  // },
  // createEvent: async (args, req) => {
  //   const {
  //     eventInput: { name, description, maxAttendees, start, end, visibleTo },
  //   } = args;
  //   if (!req.isAuth) {
  //     throw new Error('Unauthenticated!');
  //   }
  //   const event = new Event({
  //     name,
  //     description,
  //     maxAttendees,
  //     visibleTo,
  //     start: new Date(start),
  //     end: new Date(end),
  //     creator: req.userId,
  //   });
  //   const result = await event.save();
  //   const createdEvent = transformEventBase(result);
  //   const user = await User.findById(req.userId);
  //   if (!user) {
  //     throw new Error('User not found.');
  //   }
  //   user.createdEvents.push(event);
  //   await user.save();
  //   return createdEvent;
  // },
};

module.exports = weatherResolver;
