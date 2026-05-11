import { QuartzFilterPlugin } from "../types"

// Only build pages when frontmatter has publish: true
export const ExplicitPublish: QuartzFilterPlugin<undefined> = () => {
  return {
    name: "ExplicitPublish",
    shouldPublish(_ctx, [_tree, vfile]) {
      const fm = vfile.data?.frontmatter as Record<string, unknown> | undefined
      if (!fm) return false
      // publish must be strictly true
      return fm.publish === true
    },
  }
}
