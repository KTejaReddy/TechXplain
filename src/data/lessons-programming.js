/**
 * Visual lesson content for the programming concepts.
 * Every block is optional — the page derives its own visuals when one is missing.
 */
export const programmingLessons = {
  variables: {
    mapping: {
      title: 'A labelled box',
      pairs: [
        { icon: 'box', analogy: 'The box', reality: 'a place in memory' },
        { icon: 'book', analogy: 'The label', reality: 'the name you use in code' },
        { icon: 'package', analogy: 'What is inside', reality: 'the value it holds' },
        { icon: 'refresh', analogy: 'Swapping the contents', reality: 'reassigning a new value' },
      ],
    },
    code: {
      title: 'One name, one value',
      panels: [
        {
          label: 'store.js',
          lines: ['let score = 0', 'score = score + 10', 'const name = "Ada"', 'console.log(score)'],
        },
      ],
      notes: [
        { code: 'let', text: 'a value you plan to change' },
        { code: 'const', text: 'a name you will not reassign' },
        { code: 'score', text: 'the label you read and write' },
        { code: '0', text: 'the value stored inside right now' },
      ],
    },
    scenario: {
      title: 'A shopping cart that keeps a count',
      steps: [
        { icon: 'target', label: 'You add a shirt', note: 'the cart has no idea yet' },
        { icon: 'cog', label: 'The code adds 1', note: 'let count = 0, then count + 1' },
        { icon: 'package', label: 'The value is stored', note: 'under the name count' },
        { icon: 'refresh', label: 'You add a cap', note: 'count becomes 2' },
        { icon: 'monitor', label: 'The badge shows 2', note: 'read back by name' },
      ],
      note: 'Nothing magic happened — one named value changed three times while you shopped.',
    },
  },

  functions: {
    code: {
      title: 'Give it a name, use it anywhere',
      panels: [
        {
          label: 'total.js',
          lines: ['function total(price, quantity) {', '  return price * quantity', '}', '', 'total(12, 3)'],
        },
      ],
      notes: [
        { code: 'price, quantity', text: 'the inputs, called arguments' },
        { code: 'return', text: 'the value handed back to the caller' },
        { code: 'total(12, 3)', text: 'one call, one result: 36' },
      ],
    },
    mapping: {
      title: 'A coffee machine',
      pairs: [
        { icon: 'package', analogy: 'Beans and water', reality: 'the arguments you pass in' },
        { icon: 'cog', analogy: 'Press one button', reality: 'calling the function' },
        { icon: 'terminal', analogy: 'The coffee arrives', reality: 'the return value' },
        { icon: 'puzzle', analogy: 'The same machine again', reality: 'reuse instead of rewriting' },
      ],
    },
    scenario: {
      title: 'One calculation, three screens',
      steps: [
        { icon: 'cog', label: 'You write total() once', note: 'price times quantity' },
        { icon: 'smartphone', label: 'The cart screen calls it' },
        { icon: 'monitor', label: 'The checkout calls it again' },
        { icon: 'download', label: 'The receipt calls it too', note: 'same answer everywhere' },
      ],
      note: 'If the tax rule changes, you fix one function instead of hunting for the same maths in three places.',
    },
  },

  conditions: {
    code: {
      title: 'One question, two paths',
      panels: [
        { label: 'delivery.js', lines: ['if (total >= 50) {', '  return "free delivery"', '} else {', '  return "£4.99"', '}'] },
      ],
      notes: [
        { code: 'if', text: 'the question being asked' },
        { code: 'else', text: 'what happens when the answer is no' },
        { code: '>=', text: 'a comparison, here “50 or more”' },
      ],
    },
    scenario: {
      title: 'Free delivery on large orders',
      steps: [
        { icon: 'box', label: 'Your basket reaches £50', note: 'a value to test' },
        { icon: 'search', label: 'The code compares it', note: 'is total at least 50?' },
        { icon: 'checkCircle', label: 'True, so delivery is free' },
        { icon: 'monitor', label: 'Checkout shows £0.00', note: 'the other branch never ran' },
      ],
      note: 'Conditions are how one program behaves sensibly for thousands of different customers.',
    },
  },

  loops: {
    code: {
      title: 'The same work, every item',
      panels: [
        {
          label: 'emails.js',
          lines: ['for (const user of users) {', '  sendWelcome(user)', '}'],
        },
      ],
      notes: [
        { code: 'users', text: 'the list being walked through' },
        { code: 'user', text: 'the current item, one per pass' },
        { code: 'sendWelcome', text: 'the work repeated for each one' },
      ],
    },
    scenario: {
      title: 'A welcome email to 4,000 people',
      steps: [
        { icon: 'table', label: '4,000 rows are loaded' },
        { icon: 'cycle', label: 'The loop takes the first', note: 'and does the work' },
        { icon: 'send', label: 'One email is sent' },
        { icon: 'refresh', label: 'Then the next, and the next', note: 'until the list ends' },
        { icon: 'check', label: 'The loop stops on its own' },
      ],
      note: 'You wrote the instruction once; the loop repeated it thousands of times in a fraction of a second.',
    },
  },

  arrays: {
    code: {
      title: 'A numbered list',
      panels: [
        {
          label: 'playlist.js',
          lines: ['const songs = ["Intro", "Sunrise", "Night"]', 'songs[0]', 'songs.length', 'songs.push("Dawn")'],
        },
      ],
      notes: [
        { code: '[0]', text: 'the first item — counting starts at zero' },
        { code: '.length', text: 'how many items there are' },
        { code: '.push()', text: 'adds one to the end' },
      ],
    },
    scenario: {
      title: 'A playlist that keeps its order',
      steps: [
        { icon: 'layers', label: 'Three songs are stored in order' },
        { icon: 'target', label: 'You tap the second song', note: 'index 1' },
        { icon: 'zap', label: 'The player finds it instantly', note: 'no searching needed' },
        { icon: 'package', label: 'You add a fourth', note: 'it lands at the end' },
      ],
      note: 'An array is the right tool whenever order matters and you need to reach items by position.',
    },
  },

  objects: {
    code: {
      title: 'Named fields in one value',
      panels: [
        {
          label: 'user.js',
          lines: ['const user = {', '  name: "Ada",', '  plan: "pro",', '  active: true', '}', '', 'user.plan'],
        },
      ],
      notes: [
        { code: 'name, plan, active', text: 'the keys describing the thing' },
        { code: '"Ada"', text: 'the value stored under that key' },
        { code: 'user.plan', text: 'reading one field by name' },
      ],
    },
    mapping: {
      title: 'An index card',
      pairs: [
        { icon: 'chat', analogy: 'The card', reality: 'the object' },
        { icon: 'book', analogy: 'Field names', reality: 'the keys' },
        { icon: 'package', analogy: 'What is written in each field', reality: 'the values' },
        { icon: 'users', analogy: 'Two cards, same template', reality: 'two objects, same shape' },
      ],
    },
    scenario: {
      title: 'A user profile on a settings page',
      steps: [
        { icon: 'userCheck', label: 'One object describes the account', note: 'name, plan, email' },
        { icon: 'download', label: 'It arrives from the API as JSON' },
        { icon: 'target', label: 'The page reads one field', note: 'user.plan' },
        { icon: 'monitor', label: 'The badge shows “Pro”' },
      ],
      note: 'Grouping related values under one name keeps code readable as the data grows.',
    },
  },

  classes: {
    code: {
      title: 'A template, then instances',
      panels: [
        {
          label: 'dog.js',
          lines: ['class Dog {', '  constructor(name) { this.name = name }', '  speak() { return this.name + " barks" }', '}', '', 'new Dog("Rex").speak()'],
        },
      ],
      notes: [
        { code: 'class', text: 'the template, written once' },
        { code: 'new', text: 'makes one real instance from it' },
        { code: 'this.name', text: 'data stored on that instance' },
      ],
    },
    mapping: {
      title: 'A blueprint and its houses',
      pairs: [
        { icon: 'book', analogy: 'The blueprint', reality: 'the class definition' },
        { icon: 'building', analogy: 'A house built from it', reality: 'an instance, called an object' },
        { icon: 'package', analogy: 'The rooms in each house', reality: 'the properties it holds' },
        { icon: 'cog', analogy: 'What you can do inside', reality: 'the methods it offers' },
      ],
    },
    scenario: {
      title: 'Players in a small game',
      steps: [
        { icon: 'book', label: 'You write a Player class once', note: 'name, score, move()' },
        { icon: 'users', label: 'Four players join the match', note: 'four instances' },
        { icon: 'target', label: 'Each keeps its own score', note: 'state lives per instance' },
        { icon: 'zap', label: 'They all share the same moves', note: 'written once in the class' },
      ],
      note: 'Classes pay off when you have many things that behave the same but hold different data.',
    },
  },

  'object-oriented-programming': {
    mapping: {
      title: 'Four ideas, one model',
      pairs: [
        { icon: 'box', analogy: 'Group data with behaviour', reality: 'encapsulation' },
        { icon: 'gitBranch', analogy: 'Share what is common', reality: 'inheritance' },
        { icon: 'puzzle', analogy: 'Same call, different behaviour', reality: 'polymorphism' },
        { icon: 'eye', analogy: 'Hide the internals', reality: 'abstraction' },
      ],
    },
    scenario: {
      title: 'Modelling a bike shop in code',
      steps: [
        { icon: 'box', label: 'A Bike class holds price and gears' },
        { icon: 'gitBranch', label: 'RoadBike and EBike extend it' },
        { icon: 'puzzle', label: 'Both answer describe() differently', note: 'same call, own behaviour' },
        { icon: 'cog', label: 'The shop loops over any bike', note: 'without caring which type' },
      ],
      note: 'Object-oriented code pays off when you keep adding kinds of things that share most of their behaviour.',
    },
  },

  inheritance: {
    code: {
      title: 'Extending what already works',
      panels: [
        {
          label: 'users.js',
          lines: ['class User { greet() { return "hi" } }', '', 'class Admin extends User {', '  deleteAnything() { return true }', '}'],
        },
      ],
      notes: [
        { code: 'extends', text: 'reuse everything User already has' },
        { code: 'greet()', text: 'inherited, not rewritten' },
        { code: 'deleteAnything()', text: 'added only where it is needed' },
      ],
    },
    mapping: {
      title: 'Family traits',
      pairs: [
        { icon: 'users', analogy: 'The parent', reality: 'the base class' },
        { icon: 'gitBranch', analogy: 'The child', reality: 'the class that extends it' },
        { icon: 'check', analogy: 'Inherited features', reality: 'methods the child gets free' },
        { icon: 'cycle', analogy: 'Overriding one', reality: 'replacing a method on purpose' },
      ],
    },
    scenario: {
      title: 'Customers and admins in one app',
      steps: [
        { icon: 'users', label: 'A Customer class exists', note: 'login, view orders' },
        { icon: 'gitBranch', label: 'Admin extends Customer' },
        { icon: 'check', label: 'It inherits login for free' },
        { icon: 'key', label: 'It adds admin-only actions', note: 'refunds, user management' },
      ],
      note: 'Inheritance is for real “is a kind of” relationships — anything looser is better as plain composition.',
    },
  },

  polymorphism: {
    code: {
      title: 'One call, many behaviours',
      panels: [
        {
          label: 'shapes.js',
          lines: ['shape.area()', '', '// Circle    → 3.14 * r * r', '// Rectangle → w * h'],
        },
      ],
      notes: [
        { code: 'shape.area()', text: 'the same call every time' },
        { code: 'Circle', text: 'answers with its own formula' },
        { code: 'Rectangle', text: 'answers with a different one' },
      ],
    },
    mapping: {
      title: 'Same request, different answers',
      pairs: [
        { icon: 'chat', analogy: '“How do you get home?”', reality: 'one shared method name' },
        { icon: 'route', analogy: 'By bus', reality: 'one class answering' },
        { icon: 'cycle', analogy: 'By bike', reality: 'another class answering' },
        { icon: 'flow', analogy: 'You never ask which', reality: 'the caller stays simple' },
      ],
    },
    scenario: {
      title: 'Drawing a mixed canvas',
      steps: [
        { icon: 'monitor', label: 'The canvas has circles and squares' },
        { icon: 'cycle', label: 'It loops over all of them' },
        { icon: 'puzzle', label: 'It calls draw() on each', note: 'one line of code' },
        { icon: 'eye', label: 'Each shape draws itself', note: 'the shapes decide how' },
      ],
      note: 'Polymorphism keeps the calling code short as new kinds of things are added.',
    },
  },

  recursion: {
    code: {
      title: 'A function that calls itself',
      panels: [
        {
          label: 'factorial.js',
          lines: ['function factorial(n) {', '  if (n <= 1) return 1        // base case', '  return n * factorial(n - 1)', '}'],
        },
      ],
      notes: [
        { code: 'base case', text: 'the stop condition, without which it never ends' },
        { code: 'factorial(n - 1)', text: 'the same problem, one step smaller' },
        { code: 'return', text: 'each call hands its result back up' },
      ],
    },
    mapping: {
      title: 'Nesting dolls',
      pairs: [
        { icon: 'box', analogy: 'Dolls inside dolls', reality: 'a problem inside the same problem' },
        { icon: 'search', analogy: 'Open the next one', reality: 'the recursive call' },
        { icon: 'target', analogy: 'The smallest doll', reality: 'the base case' },
        { icon: 'refresh', analogy: 'Closing them back up', reality: 'each call returning' },
      ],
    },
    scenario: {
      title: 'Listing every file in a folder',
      steps: [
        { icon: 'folder', label: 'A folder has files and folders' },
        { icon: 'search', label: 'You list it', note: 'and meet a subfolder' },
        { icon: 'refresh', label: 'You list that one too', note: 'the same job, smaller' },
        { icon: 'check', label: 'Empty folder found', note: 'the base case' },
        { icon: 'layers', label: 'The full tree is printed' },
      ],
      note: 'A tree is the shape recursion loves — folder trees, comment threads, menus and JSON.',
    },
  },

  pointers: {
    code: {
      title: 'A value that is an address',
      panels: [
        { label: 'pointer.c', lines: ['int score = 10;', 'int *p = &score;', '*p = 20;', '// score is now 20'] },
      ],
      notes: [
        { code: '&score', text: '“the address of score”' },
        { code: 'int *p', text: 'a pointer holding that address' },
        { code: '*p = 20', text: 'writing through the pointer changes the original' },
      ],
    },
    mapping: {
      title: 'A house and its address',
      pairs: [
        { icon: 'building', analogy: 'The house', reality: 'the actual value in memory' },
        { icon: 'route', analogy: 'Its address', reality: 'the pointer' },
        { icon: 'send', analogy: 'Posting to that address', reality: 'writing through the pointer' },
        { icon: 'alert', analogy: 'A demolished house', reality: 'a dangling pointer — a crash' },
      ],
    },
    scenario: {
      title: 'Passing a large photo around',
      steps: [
        { icon: 'folder', label: 'A photo sits in memory', note: 'a few megabytes' },
        { icon: 'route', label: 'Functions get its address', note: 'not a copy' },
        { icon: 'zap', label: 'Editing is instant', note: 'no megabytes copied' },
        { icon: 'alert', label: 'Free the photo too early', note: 'and the pointer dangles' },
      ],
      note: 'Pointers are why some languages are fast and why they can crash — the trade has not gone away.',
    },
  },

  'memory-management': {
    beforeAfter: {
      before: {
        label: 'Manual memory',
        steps: [
          { icon: 'download', label: 'You request memory', note: 'malloc' },
          { icon: 'cog', label: 'You use it' },
          { icon: 'alert', label: 'You must free it yourself', note: 'forget, and it leaks' },
        ],
      },
      after: {
        label: 'Garbage collected',
        steps: [
          { icon: 'package', label: 'You create objects freely' },
          { icon: 'eye', label: 'The runtime tracks what is still reachable' },
          { icon: 'refresh', label: 'Unused memory is reclaimed', note: 'automatically' },
        ],
      },
      note: 'Managed languages trade a little speed and a short pause for removing a whole class of bugs.',
    },
    scenario: {
      title: 'An app that runs for weeks',
      steps: [
        { icon: 'server', label: 'A service starts', note: 'and keeps handling requests' },
        { icon: 'package', label: 'Every request allocates objects' },
        { icon: 'eye', label: 'Reachability is checked', note: 'anything unreferenced can go' },
        { icon: 'refresh', label: 'Memory is handed back', note: 'the process stays flat' },
      ],
      note: 'A leak is not memory that is in use — it is memory nothing can reach but nothing released.',
    },
  },

  compiler: {
    beforeAfter: {
      before: {
        label: 'Interpreted each time',
        steps: [
          { icon: 'fileCode', label: 'Source code runs' },
          { icon: 'cog', label: 'Translation happens as it goes' },
          { icon: 'clock', label: 'Slower start, slower loops' },
        ],
      },
      after: {
        label: 'Compiled once',
        steps: [
          { icon: 'puzzle', label: 'Translated ahead of time', note: 'one build step' },
          { icon: 'download', label: 'A binary is produced' },
          { icon: 'zap', label: 'It runs directly on the CPU', note: 'fast, no translator present' },
        ],
      },
      note: 'The compiler also does the checking humans would otherwise do at 3am.',
    },
    code: {
      title: 'Source in, machine code out',
      panels: [
        { label: 'You write', lines: ['let x = 1 + 2'] },
        { label: 'The CPU eventually runs', lines: ['mov eax, 1', 'add eax, 2'] },
      ],
      notes: [
        { code: 'errors', text: 'caught before the program ever runs' },
        { code: 'optimise', text: 'the compiler removes work you did not need' },
        { code: 'target', text: 'the same source can produce builds for several CPUs' },
      ],
    },
    scenario: {
      title: 'Shipping a desktop app',
      steps: [
        { icon: 'fileCode', label: 'Developers write source files' },
        { icon: 'puzzle', label: 'A build compiles everything', note: 'minutes, sometimes hours' },
        { icon: 'alert', label: 'Type errors stop the build', note: 'before users ever see it' },
        { icon: 'download', label: 'One executable is produced' },
        { icon: 'rocket', label: 'It ships and runs fast' },
      ],
      note: 'The waiting happens on your machine, which is exactly the trade you want.',
    },
  },

  interpreter: {
    mapping: {
      title: 'A live translator',
      pairs: [
        { icon: 'chat', analogy: 'A speaker on stage', reality: 'your source code' },
        { icon: 'users', analogy: 'A translator beside them', reality: 'the interpreter' },
        { icon: 'zap', analogy: 'Runs immediately', reality: 'no build step' },
        { icon: 'clock', analogy: 'A little slower per sentence', reality: 'translation happens as it runs' },
      ],
    },
    scenario: {
      title: 'A script you run right away',
      steps: [
        { icon: 'terminal', label: 'You type python app.py' },
        { icon: 'fileCode', label: 'The interpreter reads line one' },
        { icon: 'zap', label: 'It executes it immediately' },
        { icon: 'refresh', label: 'Then line two, and on', note: 'no waiting for a build' },
      ],
      note: 'That immediacy is why scripts, notebooks and glue code are usually interpreted.',
    },
  },

  runtime: {
    mapping: {
      title: 'The engine room',
      pairs: [
        { icon: 'fileCode', analogy: 'The code you wrote', reality: 'instructions' },
        { icon: 'cog', analogy: 'The engine', reality: 'the runtime that executes them' },
        { icon: 'layers', analogy: 'The parts bolted to it', reality: 'memory, timers, file and network access' },
        { icon: 'box', analogy: 'Everything it ships with', reality: 'the standard library' },
      ],
    },
    scenario: {
      title: 'Running one file two ways',
      steps: [
        { icon: 'monitor', label: 'In a browser', note: 'no file system, lots of page APIs' },
        { icon: 'server', label: 'On a server', note: 'files, sockets, no DOM' },
        { icon: 'fileCode', label: 'Same JavaScript both times' },
        { icon: 'cog', label: 'The runtime decides what is allowed' },
      ],
      note: 'A runtime is the environment a language lives in — that is why the same code behaves differently in two places.',
    },
  },

  'package-manager': {
    code: {
      title: 'Borrowing code safely',
      panels: [
        { label: 'terminal', lines: ['npm install date-fns', 'npm run build'] },
        { label: 'package.json', lines: ['"dependencies": {', '  "date-fns": "^4.1.0"', '}'] },
      ],
      notes: [
        { code: 'install', text: 'downloads the package and its own dependencies' },
        { code: '"^4.1.0"', text: 'which versions are allowed to update' },
        { code: 'lock file', text: 'exact versions, so every machine matches' },
      ],
    },
    scenario: {
      title: 'Adding a date library',
      steps: [
        { icon: 'search', label: 'You need date formatting' },
        { icon: 'terminal', label: 'You install one package', note: 'one command' },
        { icon: 'download', label: 'It arrives with its own needs', note: 'a tree of packages' },
        { icon: 'checkCircle', label: 'Versions are locked', note: 'your teammate gets the same' },
      ],
      note: 'The manager solves the boring part — versions, updates and staying in sync across machines.',
    },
  },

  'exception-handling': {
    code: {
      title: 'Plan for the failure',
      panels: [
        {
          label: 'pay.js',
          lines: ['try {', '  await chargeCard(order)', '} catch (error) {', '  return "Payment failed, try again"', '} finally {', '  clearBasket()', '}'],
        },
      ],
      notes: [
        { code: 'try', text: 'the risky part' },
        { code: 'catch', text: 'what to do when it throws' },
        { code: 'finally', text: 'runs either way, for clean-up' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'Unhandled',
        steps: [
          { icon: 'coin', label: 'A card is declined' },
          { icon: 'alert', label: 'The error bubbles up', note: 'nobody catches it' },
          { icon: 'x', label: 'The whole request fails', note: 'a blank error page' },
        ],
      },
      after: {
        label: 'Handled',
        steps: [
          { icon: 'coin', label: 'A card is declined' },
          { icon: 'shieldCheck', label: 'The error is caught', note: 'one small block' },
          { icon: 'monitor', label: 'The user sees a clear message', note: 'and the basket survives' },
        ],
      },
      note: 'Handling errors is not about hiding them — it is about deciding what the user experiences next.',
    },
    scenario: {
      title: 'A payment that does not go through',
      steps: [
        { icon: 'coin', label: 'The bank declines the card' },
        { icon: 'alert', label: 'The code throws an error' },
        { icon: 'shieldCheck', label: 'It is caught nearby' },
        { icon: 'chat', label: 'You see “try another card”', note: 'instead of a crash' },
        { icon: 'search', label: 'The error is logged', note: 'so the team can see it' },
      ],
      note: 'Good software expects things to go wrong and decides what happens next.',
    },
  },

  concurrency: {
    beforeAfter: {
      before: {
        label: 'One at a time',
        steps: [
          { icon: 'download', label: 'Three images requested' },
          { icon: 'clock', label: 'The first finishes, then the second' },
          { icon: 'clock', label: 'The page waits for all three' },
        ],
      },
      after: {
        label: 'Concurrent',
        steps: [
          { icon: 'download', label: 'All three requested at once' },
          { icon: 'zap', label: 'They download in parallel' },
          { icon: 'clock', label: 'The wait is the slowest one', note: 'not the sum' },
        ],
      },
      note: 'Concurrency is about overlapping waiting, not about making a single calculation quicker.',
    },
    scenario: {
      title: 'A page loading six images',
      steps: [
        { icon: 'monitor', label: 'The page opens' },
        { icon: 'download', label: 'Six requests start together' },
        { icon: 'network', label: 'They arrive in any order' },
        { icon: 'layers', label: 'Each slot fills as its image lands' },
      ],
      note: 'The tricky part is never the starting — it is what happens when two pieces of work touch the same data.',
    },
  },

  algorithms: {
    mapping: {
      title: 'A recipe of exact steps',
      pairs: [
        { icon: 'book', analogy: 'The recipe', reality: 'the algorithm' },
        { icon: 'package', analogy: 'The ingredients', reality: 'the input data' },
        { icon: 'cog', analogy: 'Follow the steps in order', reality: 'running it' },
        { icon: 'scale', analogy: 'Some recipes are quicker', reality: 'efficiency, measured in big-O' },
      ],
    },
    code: {
      title: 'Two ways to find a name',
      panels: [
        { label: 'One by one', lines: ['for (name of list) if (name === "Ada") return true', '// 10,000 checks in the worst case'] },
        { label: 'Sorted list, halved each time', lines: ['while (low <= high) { mid = (low + high) / 2 … }', '// about 14 checks'] },
      ],
      notes: [
        { code: 'linear', text: 'the list must be read from the start' },
        { code: 'binary', text: 'each step removes half the list' },
        { code: 'sorted', text: 'the faster one needs the data in order first' },
      ],
    },
    scenario: {
      title: 'Searching a contact list',
      steps: [
        { icon: 'search', label: 'You type a name' },
        { icon: 'cycle', label: 'The list is scanned or halved', note: 'depending on the algorithm' },
        { icon: 'zap', label: 'The match is found' },
        { icon: 'clock', label: 'With a million rows it still feels instant' },
      ],
      note: 'Choosing the right algorithm matters far more than faster hardware once the data grows.',
    },
  },

  'data-structures': {
    mapping: {
      title: 'The right container for the job',
      pairs: [
        { icon: 'layers', analogy: 'A list in order', reality: 'array — fast by index' },
        { icon: 'box', analogy: 'A stack of plates', reality: 'stack — last in, first out' },
        { icon: 'users', analogy: 'A queue at a till', reality: 'queue — first in, first out' },
        { icon: 'book', analogy: 'A dictionary', reality: 'map — look up by key' },
      ],
    },
    scenario: {
      title: 'Undo in a text editor',
      steps: [
        { icon: 'target', label: 'You type, you delete, you paste' },
        { icon: 'layers', label: 'Each change is pushed on a stack' },
        { icon: 'refresh', label: 'Ctrl+Z pops the last change', note: 'exactly the newest one' },
        { icon: 'check', label: 'Redo pushes it back' },
      ],
      note: 'Pick the wrong structure and simple features become slow or complicated to write.',
    },
  },

  'async-await': {
    code: {
      title: 'Waiting without freezing',
      panels: [
        {
          label: 'fetch.js',
          lines: ['async function load() {', '  const data = await fetch("/api/orders")', '  return data.json()', '}'],
        },
      ],
      notes: [
        { code: 'async', text: 'this function may take a while' },
        { code: 'await', text: 'pause here, but let the rest of the app carry on' },
        { code: 'const data', text: 'picks up where it left off when the answer arrives' },
      ],
    },
    beforeAfter: {
      before: {
        label: 'Blocking',
        steps: [
          { icon: 'send', label: 'A request goes out' },
          { icon: 'clock', label: 'Everything stops and waits' },
          { icon: 'alert', label: 'The app freezes', note: 'clicks ignored' },
        ],
      },
      after: {
        label: 'Awaiting',
        steps: [
          { icon: 'send', label: 'The request goes out' },
          { icon: 'zap', label: 'The rest of the app keeps working', note: 'spinner, other updates' },
          { icon: 'download', label: 'The code resumes with the answer' },
        ],
      },
      note: 'Await reads like a straight line of code while the runtime juggles everything else.',
    },
    scenario: {
      title: 'Ordering food while you browse',
      steps: [
        { icon: 'send', label: 'You tap “order”', note: 'a slow request starts' },
        { icon: 'zap', label: 'You keep scrolling the menu' },
        { icon: 'download', label: 'The confirmation arrives' },
        { icon: 'checkCircle', label: 'The order card updates' },
      ],
      note: 'Nothing about the wait blocks anything else, which is why the interface never feels stuck.',
    },
  },

  'big-o-notation': {
    code: {
      title: 'How the work grows',
      panels: [
        { label: 'O(1) constant', lines: ['items[0]           // same cost for 10 or 10 million'] },
        { label: 'O(n) linear', lines: ['items.filter(...)  // work doubles when the list doubles'] },
      ],
      notes: [
        { code: 'O(log n)', text: 'halving each step — a million rows in about twenty steps' },
        { code: 'O(n log n)', text: 'a good sort' },
        { code: 'O(n²)', text: 'two nested loops — fine at 100, painful at 10,000' },
      ],
    },
    scenario: {
      title: 'A feature that was fine until it was not',
      steps: [
        { icon: 'check', label: '100 orders: instant', note: 'nested loop, no problem' },
        { icon: 'chart', label: '10,000 orders: a second' },
        { icon: 'alert', label: '1,000,000 orders: minutes', note: 'still the same code' },
        { icon: 'puzzle', label: 'One index turns it into a lookup', note: 'a different shape of work' },
      ],
      note: 'Big-O is a warning system: it tells you which code will hurt as your data grows.',
    },
  },

  closures: {
    code: {
      title: 'A function that remembers',
      panels: [
        {
          label: 'counter.js',
          lines: ['function counter() {', '  let count = 0', '  return () => ++count', '}', '', 'const next = counter()'],
        },
      ],
      notes: [
        { code: 'let count', text: 'lives inside the outer function' },
        { code: 'return () =>', text: 'the inner function captures it' },
        { code: 'next()', text: 'each call still sees that same count' },
      ],
    },
    mapping: {
      title: 'A backpack the function carries',
      pairs: [
        { icon: 'package', analogy: 'The backpack', reality: 'the variables it closed over' },
        { icon: 'puzzle', analogy: 'Who carries it', reality: 'the returned function' },
        { icon: 'users', analogy: 'Two friends, two backpacks', reality: 'each call of counter() has its own count' },
        { icon: 'eye', analogy: 'Nobody else can open it', reality: 'the value stays private' },
      ],
    },
    scenario: {
      title: 'A like button that keeps its own count',
      steps: [
        { icon: 'cog', label: 'A counter function is created', note: 'count starts at 0' },
        { icon: 'target', label: 'You tap the heart' },
        { icon: 'refresh', label: 'It remembers the number', note: 'between clicks' },
        { icon: 'monitor', label: '1, then 2, then 3 appear' },
      ],
      note: 'Two buttons using the same function still count separately, each with its own remembered value.',
    },
  },

  'type-systems': {
    beforeAfter: {
      before: {
        label: 'Types found at runtime',
        steps: [
          { icon: 'rocket', label: 'Code ships untested for that case' },
          { icon: 'users', label: 'A user triggers the path' },
          { icon: 'alert', label: 'undefined is not a function', note: 'in production, on their screen' },
        ],
      },
      after: {
        label: 'Types checked before running',
        steps: [
          { icon: 'fileCode', label: 'You write the shape of the data down' },
          { icon: 'checkCircle', label: 'The compiler checks every use' },
          { icon: 'shieldCheck', label: 'The mistake never reaches users', note: 'it fails on your machine instead' },
        ],
      },
      note: 'Types move mistakes from a stranger clicking a button to your own editor, before anything ships.',
    },
    code: {
      title: 'Saying what shape it is',
      panels: [
        {
          label: 'types.ts',
          lines: ['type Order = {', '  id: number', '  total: number', '  shipped: boolean', '}', '', 'order.totl  // ← error, immediately'],
        },
      ],
      notes: [
        { code: 'type Order', text: 'one description, reused everywhere' },
        { code: 'order.totl', text: 'a typo caught before the code runs' },
        { code: 'boolean', text: 'only true or false is allowed there' },
      ],
    },
    scenario: {
      title: 'Renaming a field safely',
      steps: [
        { icon: 'cycle', label: 'You rename total to amount' },
        { icon: 'checkCircle', label: 'Every place using it is flagged', note: 'in seconds' },
        { icon: 'cog', label: 'You fix them all at once' },
        { icon: 'shieldCheck', label: 'Nothing breaks in production' },
      ],
      note: 'On a large codebase the type checker is often the only reliable map of what depends on what.',
    },
  },

  'garbage-collection': {
    beforeAfter: {
      before: {
        label: 'Manual freeing',
        steps: [
          { icon: 'download', label: 'Objects allocated' },
          { icon: 'cog', label: 'Used and finished with' },
          { icon: 'alert', label: 'Free must be called', note: 'miss one and memory leaks' },
        ],
      },
      after: {
        label: 'Garbage collection',
        steps: [
          { icon: 'package', label: 'Objects allocated freely' },
          { icon: 'eye', label: 'The collector finds unreachable ones' },
          { icon: 'refresh', label: 'Frees them in a short pause', note: 'or in the background' },
        ],
      },
      note: 'It removes an entire class of bugs, at the cost of occasional pauses you do not control.',
    },
    scenario: {
      title: 'A server that runs for months',
      steps: [
        { icon: 'server', label: 'Millions of requests handled' },
        { icon: 'package', label: 'Each one allocates temporary data' },
        { icon: 'eye', label: 'Unreachable data is collected', note: 'a few milliseconds at a time' },
        { icon: 'chart', label: 'Memory stays flat', note: 'no slow climb into a crash' },
      ],
      note: 'A leak in a collected language is usually a growing list or cache nothing ever clears.',
    },
  },

  'regular-expressions': {
    code: {
      title: 'A pattern, not a value',
      panels: [
        { label: 'validate.js', lines: ['const email = /^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i', '', 'email.test("ada@example.com")  // true'] },
      ],
      notes: [
        { code: '^ … $', text: 'match the whole value, not part of it' },
        { code: '[^@\\s]+', text: 'one or more characters that are not @ or a space' },
        { code: '.{2,}', text: 'at least two of anything — here, the domain ending' },
      ],
    },
    mapping: {
      title: 'Rules for a puzzle piece',
      pairs: [
        { icon: 'search', analogy: '“Starts with a letter”', reality: 'an anchor and a character class' },
        { icon: 'layers', analogy: '“Three or four digits”', reality: 'a quantifier {3,4}' },
        { icon: 'refresh', analogy: '“Repeat that part”', reality: 'the + and * symbols' },
        { icon: 'target', analogy: '“Then a dot, then letters”', reality: 'literal characters mixed in' },
      ],
    },
    scenario: {
      title: 'Checking what someone typed',
      steps: [
        { icon: 'target', label: 'You type an email address' },
        { icon: 'search', label: 'The pattern tests the whole string' },
        { icon: 'alert', label: 'A missing @ fails instantly', note: 'usually before you submit' },
        { icon: 'checkCircle', label: 'A valid one passes' },
      ],
      note: 'Powerful, and easy to make unreadable — keep patterns short, named and commented.',
    },
  },
}
