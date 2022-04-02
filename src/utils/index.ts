export const exhausted = (x: never): never => {
    throw new Error(`Missing case statement for: ${x}`);
}

const TRUTHY_WORDS = ['yes', 'true'];

export function str2bool(str: string | null | undefined): boolean {
    return str != null && TRUTHY_WORDS.includes(str.toLowerCase());
}

export function deepEqual(x: any, y: any): boolean {
    if (x === y) {
        return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false;

        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop]))
                    return false;
            }
            else
                return false;
        }

        return true;
    }
    else
        return false;
}
