"use client"

import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero_section";
import { Capabilities } from "@/components/landing/capabilities";
import { Wflow } from "@/components/landing/clinic_flow";
import { Teams } from "@/components/landing/teams_choose";
import { Fcta } from "@/components/landing/final_cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
    
    return (<><Header></Header> <Hero></Hero> 
    <Capabilities></Capabilities>
    <Wflow></Wflow>
    <Teams></Teams>
    <Fcta></Fcta>
    <Footer></Footer>
    </>
    );

}