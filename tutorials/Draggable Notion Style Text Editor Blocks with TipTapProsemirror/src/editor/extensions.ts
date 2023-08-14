import StarterKit from "@tiptap/starter-kit";
import { Node } from "@tiptap/core";
import RootBlock from "./root-block";
import Keymap from "./keymap";

const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "rootblock+",
});

const Extensions = [
  Document,
  RootBlock,
  Keymap,
  StarterKit.configure({
    document: false,
  }),
];

export default Extensions;
