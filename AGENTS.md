<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep customer-facing catalog cleanup in presentation helpers rather than mutating catalog data, so internal references and commerce values remain intact.
- Centralize RAVIO contrast roles in the CSS theme and mirror them in the token registry; scoped legacy text selectors preserve imported components and decorative colors until their classes are migrated.
