import { DragHandleDots2Icon, PlusIcon } from "@radix-ui/react-icons";
import { NodeViewContent, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

// Define the RootBlockComponent, which will serve as a custom Node View in the Tiptap editor
const RootBlockComponent: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  // Function to create a new node immediately after the current node
  const createNodeAfter = () => {
    // Calculate the position right after the current node
    const pos = getPos() + node.nodeSize;

    // Use the editor's command to insert a new "rootblock" node at the calculated position
    editor
      .chain()
      .insertContentAt(pos, {
        type: "rootblock",
        content: [
          {
            type: "paragraph",
          },
        ],
      })
      .focus(pos + 4) // Focus on the new block (you might need to adjust the position based on your exact requirements)
      .run();
  };

  // Render the custom node view
  return (
    <NodeViewWrapper as="div" className="group flex w-full gap-2">
      {/* Container for buttons that appear on hover */}
      <div
        className="flex w-16 gap-1 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
        aria-label="left-menu"
        contentEditable="false"
      >
        {/* Button to add a new node after the current node */}
        <button type="button" onClick={createNodeAfter} className="">
          <PlusIcon className="h-5 w-5" />
        </button>
        {/* Draggable handle button to allow rearranging nodes */}
        <button
          contentEditable={false}
          draggable
          data-drag-handle
          className="cursor-grab"
        >
          <DragHandleDots2Icon className="h-5 w-5" />
        </button>
      </div>
      {/* Area where the node's actual content will be rendered */}
      <NodeViewContent className="w-full" />
    </NodeViewWrapper>
  );
};

export default RootBlockComponent;
