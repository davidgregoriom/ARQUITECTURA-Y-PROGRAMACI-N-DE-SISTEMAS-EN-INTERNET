export function add(a: number, b: number): number {
    return a + b;
  }
  
  




  // Learn more at https://deno.land/manual/examples/module_metadata#concepts
  if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
  }





/*
  interface ImportMeta{
    main: boolean;
    url: string;
    resolve(specifier: string):string;
}

const url=new URL(import.meta.url);
  if()
*/
