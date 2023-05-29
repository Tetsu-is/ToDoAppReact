import { rest } from 'msw'

export const handlers = [
    rest.get('/dogAPI', (req, res, ctx) => {
        return res(
            ctx.json({
                "message": "https://images.dog.ceo/breeds/brabancon/n02112706_1805.jpg",
                "status": "success"
            })
          );
    }),
]