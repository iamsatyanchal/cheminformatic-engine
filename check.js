fetch(window.atob("aHR0cHM6Ly9wcm9qZWN0LWFscGhhLWRlbHRhLnZlcmNlbC5hcHAvbmV3dmlzaXRvcj91cmw9Y2hlbWluZm9ybWF0aWMtbG9jYWxob3N0LXRlc3RlZA=="))
var wtfareyoudoing = window.atob("Z3NrX21pZ2l3aUl1dTFPQlhpMGpUOTQ2V0dkeWIzRllrZkZ3ZnJFbHdVS1VDdVBRZzQyVFBPbG0=");
var systemprompt = `You are a **cheminformatics assistant**.

Your task is to take a **chemical name OR chemical formula** as input and return the **SMILES representation and chemical information** in **strict JSON format only**.

Follow these rules strictly:

1. Accept either:

   * Chemical name (example: "benzene")
   * Chemical formula (example: "C6H6")

2. Generate the **correct canonical SMILES string**.

3. Provide estimated chemical information fields.

4. Your output must be **VALID JSON ONLY**.
   Do **not** include explanations, comments, markdown, or extra text.

5. Always return the JSON object using the following schema.

6. If the chemical cannot be identified, set "found": false and keep other fields null.

7. Numeric fields must be numbers, not strings.

---

JSON OUTPUT SCHEMA

{
"found": boolean,
"input": string,
"chemical_name": string,
"formula": string,
"smiles": string,
"molecular_weight": number,
"atoms": number,
"hydrogen_atoms": number,
"double_bonds": number,
"triple_bonds": number,
"aromatic": boolean,
"rings": number,
"functional_groups": [
string
],
"basic_properties": {
"polarity": string,
"acidic": boolean,
"basic": boolean,
"organic": boolean
}
}

---

Example Input

benzene

Example Output

{
"found": true,
"input": "benzene",
"chemical_name": "Benzene",
"formula": "C6H6",
"smiles": "c1ccccc1",
"molecular_weight": 78.11,
"atoms": 12,
"hydrogen_atoms": 6,
"double_bonds": 3,
"triple_bonds": 0,
"aromatic": true,
"rings": 1,
"functional_groups": [],
"basic_properties": {
"polarity": "nonpolar",
"acidic": false,
"basic": false,
"organic": true
}
}`;
async function analyze_formula() {
    var formula_input = document.getElementById("formula_input").value;
    document.getElementById("btnhai").innerText = "Analyzing..."
    document.getElementById("formula_text").innerText = "FORMULA: " + formula_input;
    var request_body = {
        messages: [
            {
                role: "system",
                content: systemprompt
            },
            {
                role: "user",
                content: formula_input
            }
        ],
        model: "qwen/qwen3-32b",
        temperature: 0.6,
        max_completion_tokens: 4096,
        top_p: 0.95,
        stream: false,
        reasoning_effort: "none",
        response_format: { type: "json_object" }
    }
    document.getElementById("btnhai").innerText = "Calculating..."
    var response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + wtfareyoudoing
        },
        body: JSON.stringify(request_body)
    })

    var data = await response.json();
    var ai_json = JSON.parse(data.choices[0].message.content);
    console.log(ai_json);
    document.getElementById("btnhai").innerText = "Generating..."
    document.getElementById("chemical_name").innerText = ai_json.chemical_name;
    document.getElementById("formula_text").innerText = "FORMULA: " + ai_json.formula;
    document.getElementById("smiles_code").innerText = ai_json.smiles;
    document.getElementById("molecular_weight").innerText = ai_json.molecular_weight;
    document.getElementById("atoms_total").innerText = ai_json.atoms;
    document.getElementById("hydrogen_atoms").innerText = ai_json.hydrogen_atoms;
    document.getElementById("double_bonds").innerText = ai_json.double_bonds;
    document.getElementById("triple_bonds").innerText = ai_json.triple_bonds;
    document.getElementById("aromatic").innerText = ai_json.aromatic;
    document.getElementById("rings").innerText = ai_json.rings;
    document.getElementById("functional_groups").innerText = ai_json.functional_groups.join(", ").replaceAll("group", "");
    document.getElementById("polarity").innerText = ai_json.basic_properties.polarity;
    document.getElementById("acidic").innerText = ai_json.basic_properties.acidic;
    document.getElementById("basic").innerText = ai_json.basic_properties.basic;
    document.getElementById("organic").innerText = ai_json.basic_properties.organic;
    // var smiles_image_url = "https://cactus.nci.nih.gov/chemical/structure/" + encodeURIComponent(ai_json.smiles) + "/image?linewidth=1.25&bgcolor=%23fff8ff&symbolfontsize=17";
    var smiles_image_url = "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/" + encodeURIComponent(ai_json.smiles) + "/PNG";
    document.getElementById("smiles_image").src = smiles_image_url;
    document.getElementById("btnhai").innerText = "Analyze";
}
