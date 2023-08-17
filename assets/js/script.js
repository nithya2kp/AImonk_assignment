const Data = {
            name: 'root'
        };
               // Function defines creation of new child node, and input child node data //
        function createView(NewData) {
            const tagView = document.createElement('div');
            tagView.className = 'tag';
               //  toggle-button while creating new element //
            const expandCollapseSymbol = document.createElement('span');
            expandCollapseSymbol.className = 'toggle-button';
            expandCollapseSymbol.textContent = NewData.collapsed ? '>' : 'v';
            expandCollapseSymbol.addEventListener('click', () => {
                NewData.collapsed = !NewData.collapsed;
                updateTagView(tagView, NewData);
            });

            const Name = document.createElement('span');
            Name.textContent = NewData.name;

            const Input = document.createElement('input');
            Input.type = 'text';
            Input.value = NewData.data || '';

            Input.addEventListener('input', (event) => {
                NewData.data = event.target.value;
            });

            const addChildButton = document.createElement('button');
            addChildButton.textContent = 'Add Child';
                // Function defining generation of child name //
            function generateChildName(parentName, index) {
                if (parentName === 'root') {
                    return `child${index}`;
                }
                return `${parentName}-child${index}`;
            }

            addChildButton.addEventListener('click', () => {
                const childCount = (NewData.children && NewData.children.length) || 0;
                const childName = generateChildName(NewData.name, childCount + 1);

                const newTag = { name: childName };
                NewData.children = NewData.children || [];
                NewData.children.push(newTag);
                updateTagView(tagView, NewData);
            });

            tagView.appendChild(expandCollapseSymbol);
            tagView.appendChild(Name);
            tagView.appendChild(Input);
            tagView.appendChild(addChildButton);

            if (NewData.children && NewData.children.length > 0 && !NewData.collapsed) {
                const childList = document.createElement('ul');
                NewData.children.forEach(childData => {
                    const childItem = document.createElement('li');
                    const childView = createView(childData);
                    childItem.appendChild(childView);
                    childList.appendChild(childItem);
                });
                tagView.appendChild(childList);
            }

            return tagView;
        }
                     // Function for persisting node details
        function updateTagView(tagView, tagData) {
            tagView.innerHTML = '';

            const expandCollapseSymbol = document.createElement('span');
            expandCollapseSymbol.className = 'toggle-button';
            expandCollapseSymbol.textContent = tagData.collapsed ? '>' : 'v';
            expandCollapseSymbol.addEventListener('click', () => {
                tagData.collapsed = !tagData.collapsed;
                updateTagView(tagView, tagData);
            });

            const Name = document.createElement('span');
            Name.textContent = tagData.name;

            const Input = document.createElement('input');
            Input.type = 'text';
            Input.value = tagData.data || '';

            Input.addEventListener('input', (event) => {
                tagData.data = event.target.value;
            });

            const addChildButton = document.createElement('button');
            addChildButton.textContent = 'Add Child';


            function generateChildName(parentName, index) {
                if (parentName === 'root') {
                    return `child${index}`;
                }
                return `${parentName}-child${index}`;
            }

            addChildButton.addEventListener('click', () => {
                const childCount = (tagData.children && tagData.children.length) || 0;
                const childName = generateChildName(tagData.name, childCount + 1);

                const newTag = { name: childName };
                tagData.children = tagData.children || [];
                tagData.children.push(newTag);
                updateTagView(tagView, tagData);
            });

            tagView.appendChild(expandCollapseSymbol);
            tagView.appendChild(Name);
            tagView.appendChild(Input);
            tagView.appendChild(addChildButton);


            if (tagData.children && tagData.children.length > 0 && !tagData.collapsed) {
                const childList = document.createElement('ul');
                tagData.children.forEach(childData => {
                    const childItem = document.createElement('li');
                    const childView = createView(childData);
                    childItem.appendChild(childView);
                    childList.appendChild(childItem);
                });
                tagView.appendChild(childList);
            }
        }
               // container for child data //
        const tagContainer = document.getElementById('tagContainer');
        const rootTagView = createView(Data);
        tagContainer.appendChild(rootTagView);
                   // Export button click to view data //
        document.getElementById('exportButton').addEventListener('click', () => {
            const jsonTextArea = document.getElementById('jsonTextArea');
            const jsonRepresentation = JSON.stringify(Data, null, 2); // Adding spaces for formatting
            jsonTextArea.value = jsonRepresentation;
        });