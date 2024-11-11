export class Collision {
    static #getVertices(rect) {
        const angle = rect.angle;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
    
        const hw = rect.width / 2;
        const hh = rect.height / 2;
    
        return [
            {
                x: rect.x + cos * hw - sin * hh,
                y: rect.y + sin * hw + cos * hh
            },
            {
                x: rect.x - cos * hw - sin * hh,
                y: rect.y - sin * hw + cos * hh
            },
            {
                x: rect.x - cos * hw + sin * hh,
                y: rect.y - sin * hw - cos * hh
            },
            {
                x: rect.x + cos * hw + sin * hh,
                y: rect.y + sin * hw - cos * hh
            }
        ];
    }

    static #dotProduct(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }

    static #getAxis(v1, v2) {
        return {
            x: -(v2.y - v1.y),
            y: v2.x - v1.x
        };
    }

    static #normalize(axis) {
        const length = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
        return {
            x: axis.x / length,
            y: axis.y / length
        };
    }

    static #project(vertices, axis) {
        let min = this.#dotProduct(vertices[0], axis);
        let max = min;

        for (let i = 1; i < vertices.length; i++) {
            const projection = this.#dotProduct(vertices[i], axis);
            if (projection < min) min = projection;
            if (projection > max) max = projection;
        }

        return { min, max };
    }

    static #overlap(proj1, proj2) {
        return proj1.max >= proj2.min && proj2.max >= proj1.min;
    }

    static isCollidingRect(rect1, rect2) {
        const vertices1 = this.#getVertices(rect1);
        const vertices2 = this.#getVertices(rect2);

        const axes = [
            this.#normalize(this.#getAxis(vertices1[0], vertices1[1])),
            this.#normalize(this.#getAxis(vertices1[1], vertices1[2])),
            this.#normalize(this.#getAxis(vertices2[0], vertices2[1])),
            this.#normalize(this.#getAxis(vertices2[1], vertices2[2]))
        ];

        for (let axis of axes) {
            const proj1 = this.#project(vertices1, axis);
            const proj2 = this.#project(vertices2, axis);

            if (!this.#overlap(proj1, proj2)) {
                return false;
            }
        }

        return true; 
    }
}