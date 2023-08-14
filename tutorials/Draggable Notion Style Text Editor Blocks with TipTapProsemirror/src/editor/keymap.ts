import { Extension } from "@tiptap/core";

// Extend the Commands interface to include the handleEnterKey command for Keymap
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    Keymap: {
      handleEnterKey: () => ReturnType;
    };
  }
}

// Define and create the Keymap extension
const Keymap = Extension.create({
  name: "Keymap",

  // Define custom commands for the extension
  addCommands() {
    return {
      handleEnterKey:
        () =>
        ({ state, chain }) => {
          const { selection, doc } = state;
          const { $from, $to } = selection;

          // Check if the cursor is within a rootblock, no selection is made, and if it's at the end of a block.
          if (
            $from.node(-1).type.name === "rootblock" &&
            $from.parent.type.isBlock &&
            $to.pos === $from.pos
          ) {
            if ($to.pos === $from.end()) {
              // Create and focus on a new root block with a paragraph inside at the cursor position
              return chain()
                .insertContentAt($from.pos, {
                  type: "rootblock",
                  content: [
                    {
                      type: "paragraph",
                    },
                  ],
                })
                .focus($from.pos + 4)
                .run();
            } else {
              console.log("Cursor is not at the end of the block");

              let currentActiveNodeTo = -1;

              // Iterate over document nodes to find the active node's end position.
              doc.descendants((node, pos) => {
                if (currentActiveNodeTo !== -1) return false;
                if (node.type.name === "rootblock") return;

                const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];
                if (nodeFrom <= $from.pos && $to.pos <= nodeTo)
                  currentActiveNodeTo = nodeTo;

                return false;
              });

              const content = doc
                .slice($from.pos, currentActiveNodeTo)
                ?.toJSON().content;

              // Replace content from cursor to the end of the block with new content.
              return chain()
                .insertContentAt(
                  { from: $from.pos, to: currentActiveNodeTo },
                  {
                    type: "rootblock",
                    content,
                  }
                )
                .focus($from.pos + 4)
                .run();
            }
          }

          // If conditions aren't met, use the default Enter behavior
          return false;
        },
    };
  },

  // Define keyboard shortcuts for the extension
  addKeyboardShortcuts() {
    return {
      Enter: ({ editor }) => editor.commands.handleEnterKey(), // Call handleEnterKey command on Enter key press
    };
  },
});

export default Keymap;
