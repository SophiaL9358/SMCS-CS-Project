var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/SophiaL9358/smcs-cs-project', // Update to point to your repository  
        user: {
            name: 'Sophia L', // update to use your name
            email: 'liu.sophia2025@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)