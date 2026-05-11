import re, os

def fix_math(content):
    # Case: $$\begin{X}  ->  $$\n\begin{X}
    content = re.sub(r'\$\$\\begin\{', '$$\\begin{', content)
    # Actually, we need: $$\begin -> $$\n\begin
    # But escaping in Python: \$\$ matches $$, \\begin matches \begin

    fixed = re.sub(r'\$\$(\\begin\{[a-z]+\})', r'$$\n\1', content)
    # Fix \end{X}$$ -> \end{X}\n$$
    fixed = re.sub(r'(\\end\{[a-z]+\})\$\$', r'\1\n$$', fixed)
    return fixed

for root, dirs, files in os.walk(r'C:\Users\GEEK\Documents\Obsidian Vault'):
    dirs[:] = [d for d in dirs if d not in ('.git', '.obsidian', '.claude', 'blog', 'docs', 'node_modules', '.superpowers', '.github')]
    for f in files:
        if f.endswith('.md'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                orig = fh.read()
            new = fix_math(orig)
            if orig != new:
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(new)
                print(f'Fixed: {path}')

print('Done')
