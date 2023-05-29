import { rest } from 'msw'

export const handlers = [
    rest.get('/dogAPI', (req, res, ctx) => {
        return res(
            ctx.json({
                "message": "../DemoDog.png",
                "status": "success"
            })
        );
    }),

    rest.get('/Tips', (req, res, ctx) => {
        return res(
            ctx.json({
                "slip": {
                    "slip_id": "2",
                    "advice": "Tips."
                }
            })
        );
    }),
]