### Description

Main content is in `TreeTools.ts`

Basic idea: convert tree into table view, after that introducing changes is trivial.

### Limitation

Initial tree (as from the assignment) was modified to unify tree implementation API.
Was tested for only one case of initial tree.

### Future improvement

 - Documentation can be improved!
 - Restore (if needed) initial tree representation using decorator pattern.
 - Increase number of initial trees for testing.
 - Some boilerplate code from excellent Vitesse template is still present...
 - Black theme can be improved (e.g., font color in input field)
 - Show colored diff instead of raw tree JSON.
 - Table view is a bit cryptic... However, it is rather convenient for troubleshooting. Note, x: holds the index of the child below...


### Development

Just run and visit http://localhost:3333

```bash
pnpm i
pnpm dev
```

### Test

```bash
pnpm test
```


