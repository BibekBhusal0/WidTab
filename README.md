## Folder Structure

```
src/
├──  components/
│   ├──  addItem.tsx
│   ├──  containerSidebar.tsx
│   ├──  footer/
│   │   ├──  addWidget/
│   │   │   ├──  index.tsx
│   │   │   ├──  todo.tsx
│   │   ├──  index.tsx
│   │   ├──  lock.tsx
│   │   ├──  settings/
│   │   │   ├──  index.tsx
│   │   │   ├──  spaces/
│   │   │   │   ├──  allSpaces.tsx
│   │   │   │   ├──  allStaticSpaces.tsx
│   │   │   │   ├──  changeCompaction.tsx
│   │   │   │   ├──  currentSpace.tsx
│   │   │   │   ├──  deleteSpace.tsx
│   │   │   │   ├──  duplicateSpace.tsx
│   │   │   ├──  theme/
│   │   │   │   ├──  addTheme.tsx
│   │   │   │   ├──  allThemes.tsx
│   │   │   │   ├──  currentTheme.tsx
│   │   │   │   ├──  renameTheme.tsx
├──  layout/
│   ├──  dynamic.tsx
│   ├──  index.tsx
│   ├──  pages/
│   │   ├──  todo.tsx
│   ├──  static.tsx
│   ├──  widgets/
│   │   ├──  todo/
│   │   │   ├──  index.tsx
├──  redux/
│   ├──  slice/
│   │   ├──  layout.ts
│   │   ├──  theme.ts
│   │   ├──  todo.ts
├──  types/
│   ├──  slice/
│   │   ├──  bookmark.ts
│   │   ├──  index.ts
│   │   ├──  theme.ts
│   │   ├──  todo.ts
│   │   ├──  widgets.ts
├──  utils/
│   ├──  cn.ts
│   ├──  next_id.ts
├──  hooks/
│   ├──  useCurrentLayout.ts
│   ├──  useCurrentTheme.ts
```
