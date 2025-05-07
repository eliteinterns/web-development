fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('cardContainer');

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'image-wrapper';

            const loader = document.createElement('div');
            loader.className = 'loader';

            const img = document.createElement('img');
            img.setAttribute('data-src', item.image);
            img.setAttribute('alt', item.title);
            img.className = 'lozad';

            imgWrapper.appendChild(loader);
            imgWrapper.appendChild(img);
            card.appendChild(imgWrapper);

            const title = document.createElement('h3');
            title.textContent = item.title;
            card.appendChild(title);

            container.appendChild(card);
        });

        const observer = lozad('.lozad', {
            loaded: function (el) {
                el.classList.add('loaded');
                const loader = el.previousElementSibling;
                if (loader && loader.classList.contains('loader')) {
                    loader.remove();
                }
            }
        });

        observer.observe();
    });
