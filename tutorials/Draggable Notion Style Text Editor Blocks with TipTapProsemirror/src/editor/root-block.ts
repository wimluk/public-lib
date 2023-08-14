import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import RootBlockComponent from "./root-block-component";

// Extend the Commands interface to include RootBlockCommands
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    RootBlockCommands: {
      setRootBlock: (position?: number) => ReturnType;
    };
  }
}

// Create and export the RootBlock node
export const RootBlock = Node.create({
  name: "rootblock",
  group: "rootblock",
  content: "block", // Ensure only one block element inside the rootblock
  draggable: true, // Make the node draggable
  selectable: false, // Node isn't selectable
  inline: false, // Node is a block-level element
  priority: 1000, // Priority for node resolution

  // Default options for the node
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  // Define commands specific to the RootBlock node
  addCommands() {
    return {
      setRootBlock:
        (position) =>
        ({ state, chain }) => {
          const {
            selection: { from },
          } = state;

          // Determine the insertion position
          const pos = position ?? from;

          // Insert a new rootblock node and focus on it
          return chain()
            .insertContentAt(pos, {
              type: "rootblock",
              content: [
                {
                  type: "paragraph",
                },
              ],
            })
            .focus(pos + 4)
            .run();
        },
    };
  },

  // Define keyboard shortcuts for the RootBlock node
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setRootBlock(),
    };
  },

  // Rules to parse the node from HTML
  parseHTML() {
    return [
      {
        tag: 'div[data-type="rootblock"]',
      },
    ];
  },

  // Rules to render the node to HTML
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "rootblock" }),
      0,
    ];
  },

  // Use ReactNodeViewRenderer to render the node view with the RootBlockComponent
  addNodeView() {
    return ReactNodeViewRenderer(RootBlockComponent);
  },
});

export default RootBlock;
