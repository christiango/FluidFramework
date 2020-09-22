export const posixPathSeparator = "/";

function removeTrailingSlash(input: string): string {
    if (input.endsWith("/")) {
        return input.substr(0, input.length - 1);
    }

    return input;
}

function removeLeadingSlash(input: string): string {
    if (input.startsWith("/")) {
        return  input.substr(1, input.length - 1);
    }

    return input;
}

/** Joins 2 paths together */
export const join = (path1: string, path2: string): string => {
    return removeLeadingSlash(removeTrailingSlash(path1)) +
     posixPathSeparator + removeLeadingSlash(path2);
};
